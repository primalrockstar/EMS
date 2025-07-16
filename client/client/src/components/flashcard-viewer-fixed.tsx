import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Brain, 
  CheckCircle, 
  XCircle,
  Trophy
} from "lucide-react";

interface FlashcardViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  difficulty: string;
  category: string;
  tags: string[];
  chapterNumber: number;
}

export default function FlashcardViewer({ open, onOpenChange }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [studyMode, setStudyMode] = useState<'all' | 'chapter' | 'difficulty' | 'scope'>('all');
  const [filterValue, setFilterValue] = useState('');
  const [showStats, setShowStats] = useState(false);

  const { data: flashcards, isLoading } = useQuery({
    queryKey: ["/api/flashcards"],
    queryFn: async () => {
      const response = await fetch("/api/flashcards");
      return response.json();
    },
  });

  const getFilteredCards = () => {
    if (!flashcards) return [];
    
    return flashcards.filter((card: Flashcard) => {
      if (studyMode === 'all') return true;
      if (studyMode === 'chapter' && filterValue) {
        return card.chapterNumber === parseInt(filterValue);
      }
      if (studyMode === 'difficulty' && filterValue) {
        return card.difficulty === filterValue;
      }
      if (studyMode === 'scope' && filterValue) {
        return card.tags.some(tag => tag.includes(filterValue));
      }
      return true;
    });
  };

  const filteredCards = getFilteredCards();
  const currentCard = filteredCards[currentIndex];

  const shuffleCards = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    if (filteredCards.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (filteredCards.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
      setIsFlipped(false);
    }
  };

  const markCorrect = () => {
    setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    setTimeout(nextCard, 500);
  };

  const markIncorrect = () => {
    setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1, total: prev.total + 1 }));
    setTimeout(nextCard, 500);
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScopeFromTags = (tags: string[]) => {
    if (tags.includes('EMT-B')) return 'EMT-B';
    if (tags.includes('AEMT')) return 'AEMT';
    if (tags.includes('Paramedic')) return 'Paramedic';
    return 'General';
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'EMT-B':
        return 'bg-blue-100 text-blue-800';
      case 'AEMT':
        return 'bg-orange-100 text-orange-800';
      case 'Paramedic':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl" aria-describedby="flashcard-loading-description">
          <DialogHeader>
            <DialogTitle>Loading Flashcards...</DialogTitle>
            <div id="flashcard-loading-description" className="text-sm text-muted-foreground">
              Loading medication flashcards for study
            </div>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="flashcard-main-description">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Medication Flashcards
            </DialogTitle>
            <Button variant="outline" size="sm" onClick={() => setShowStats(!showStats)}>
              <Trophy className="h-4 w-4 mr-2" />
              Stats
            </Button>
          </div>
          <div id="flashcard-main-description" className="text-sm text-muted-foreground">
            Study medication flashcards with multiple modes and progress tracking
          </div>
        </DialogHeader>

        <div className="p-6 pt-0">
          {/* Study Mode Selection */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={studyMode} onValueChange={(value: any) => setStudyMode(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Study mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cards</SelectItem>
                <SelectItem value="chapter">By Chapter</SelectItem>
                <SelectItem value="difficulty">By Difficulty</SelectItem>
                <SelectItem value="scope">By Scope</SelectItem>
              </SelectContent>
            </Select>

            {studyMode !== 'all' && (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${studyMode}`} />
                </SelectTrigger>
                <SelectContent>
                  {studyMode === 'chapter' && (
                    <SelectItem value="12">Chapter 12 - Pharmacology</SelectItem>
                  )}
                  {studyMode === 'difficulty' && (
                    <>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </>
                  )}
                  {studyMode === 'scope' && (
                    <>
                      <SelectItem value="EMT-B">EMT-B</SelectItem>
                      <SelectItem value="AEMT">AEMT</SelectItem>
                      <SelectItem value="Paramedic">Paramedic</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            )}

            <Button onClick={shuffleCards} variant="outline" className="flex items-center gap-2">
              <Shuffle className="h-4 w-4" />
              Shuffle
            </Button>
          </div>

          {/* Statistics Bar */}
          {showStats && (
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
                    <div className="text-sm text-muted-foreground">Incorrect</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{sessionStats.total}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={accuracy} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress Bar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Card {currentIndex + 1} of {filteredCards.length}
            </div>
            <Progress value={filteredCards.length > 0 ? ((currentIndex + 1) / filteredCards.length) * 100 : 0} className="w-32" />
          </div>

          {/* Main Flashcard */}
          {currentCard && (
            <div className="mb-6">
              <Card 
                className={`min-h-[400px] cursor-pointer transition-all duration-300 ${
                  isFlipped ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-gradient-to-br from-white to-gray-50'
                }`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(currentCard.difficulty)}>
                        {currentCard.difficulty}
                      </Badge>
                      <Badge className={getScopeColor(getScopeFromTags(currentCard.tags))}>
                        {getScopeFromTags(currentCard.tags)}
                      </Badge>
                      <Badge variant="outline">
                        {currentCard.category}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Click to flip
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-semibold mb-4">
                        {isFlipped ? 'Answer' : 'Question'}
                      </div>
                      <div className="text-base leading-relaxed">
                        {isFlipped ? currentCard.answer : currentCard.question}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {filteredCards.length === 0 && (
            <Card className="mb-6">
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground">
                  No flashcards found for the selected filters.
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation and Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button 
                onClick={prevCard} 
                variant="outline" 
                size="sm"
                disabled={filteredCards.length === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                onClick={nextCard} 
                variant="outline" 
                size="sm"
                disabled={filteredCards.length === 0}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {isFlipped && currentCard && (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={markIncorrect} 
                  variant="outline" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Incorrect
                </Button>
                <Button 
                  onClick={markCorrect} 
                  variant="outline" 
                  size="sm"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Correct
                </Button>
              </div>
            )}

            <Button 
              onClick={resetSession} 
              variant="outline" 
              size="sm"
              className="text-gray-600 hover:text-gray-700"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>

          {/* Card Information */}
          {currentCard && (
            <Card className="mt-6 bg-muted/20">
              <CardContent className="p-4">
                <div className="text-sm space-y-2">
                  <div><strong>Chapter:</strong> {currentCard.chapterNumber}</div>
                  <div><strong>Tags:</strong> {currentCard.tags.join(', ')}</div>
                  <div><strong>Study Level:</strong> {getScopeFromTags(currentCard.tags)}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}