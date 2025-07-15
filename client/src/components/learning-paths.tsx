import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, Lock, Play, Trophy, Star, Clock, Target } from "lucide-react";
import { learningPaths, availableBadges, getUserProgress, type LearningPath } from "@/data/learning-paths";

interface LearningPathsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LearningPaths({ open, onOpenChange }: LearningPathsProps) {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const userProgress = getUserProgress();

  const handlePathSelect = (path: LearningPath) => {
    setSelectedPath(path);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'reference': return <Star className="h-4 w-4" />;
      case 'scenario': return <Play className="h-4 w-4" />;
      case 'simulation': return <Target className="h-4 w-4" />;
      case 'anatomy': return <Trophy className="h-4 w-4" />;
      case 'quiz': return <CheckCircle className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getPathProgress = (path: LearningPath) => {
    const completed = path.modules.filter(m => m.completed).length;
    return (completed / path.modules.length) * 100;
  };

  const getTotalPoints = (path: LearningPath) => {
    return path.modules.reduce((sum, module) => sum + module.points, 0);
  };

  const getEarnedPoints = (path: LearningPath) => {
    return path.modules.filter(m => m.completed).reduce((sum, module) => sum + module.points, 0);
  };

  const isPathUnlocked = (path: LearningPath) => {
    if (path.prerequisites.length === 0) return true;
    
    // Check if all prerequisites are completed
    return path.prerequisites.every(prereq => {
      const prerequisitePath = learningPaths.find(p => p.id === prereq);
      return prerequisitePath && getPathProgress(prerequisitePath) === 100;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Gamified Learning Paths
          </DialogTitle>
        </DialogHeader>

        <div className="h-[80vh] overflow-y-auto">
          {!selectedPath ? (
            <div className="space-y-6">
              {/* User Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{userProgress.totalPoints}</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{userProgress.completedModules}</div>
                      <div className="text-sm text-muted-foreground">Modules Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{userProgress.earnedBadges}</div>
                      <div className="text-sm text-muted-foreground">Badges Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{userProgress.currentLevel}</div>
                      <div className="text-sm text-muted-foreground">Current Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Paths */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Choose Your Learning Path</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningPaths.map((path) => {
                    const isUnlocked = isPathUnlocked(path);
                    const progress = getPathProgress(path);
                    const earnedPoints = getEarnedPoints(path);
                    const totalPoints = getTotalPoints(path);
                    
                    return (
                      <Card 
                        key={path.id} 
                        className={`cursor-pointer transition-all ${
                          isUnlocked 
                            ? 'hover:shadow-md' 
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                        onClick={() => isUnlocked && handlePathSelect(path)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-2xl mr-2">{path.badge.icon}</span>
                              <Badge className={`${getDifficultyColor(path.difficulty)} text-white`}>
                                {path.difficulty}
                              </Badge>
                            </div>
                            {!isUnlocked && <Lock className="h-5 w-5 text-gray-400" />}
                          </div>
                          <CardTitle className="text-lg">{path.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{path.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {/* Progress Bar */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                              </div>
                              <Progress value={progress} />
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                <span>{path.estimatedTime}</span>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                                <span>{earnedPoints}/{totalPoints} pts</span>
                              </div>
                            </div>

                            {/* Modules */}
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Modules ({path.modules.length})</p>
                              <div className="flex flex-wrap gap-1">
                                {path.modules.map((module) => (
                                  <Badge 
                                    key={module.id} 
                                    variant={module.completed ? "default" : "outline"}
                                    className="text-xs"
                                  >
                                    {module.completed && <CheckCircle className="h-3 w-3 mr-1" />}
                                    {getModuleIcon(module.type)}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Prerequisites */}
                            {path.prerequisites.length > 0 && (
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Prerequisites</p>
                                <div className="flex flex-wrap gap-1">
                                  {path.prerequisites.map((prereq) => {
                                    const prerequisitePath = learningPaths.find(p => p.id === prereq);
                                    const isCompleted = prerequisitePath && getPathProgress(prerequisitePath) === 100;
                                    return (
                                      <Badge 
                                        key={prereq} 
                                        variant={isCompleted ? "default" : "destructive"}
                                        className="text-xs"
                                      >
                                        {isCompleted && <CheckCircle className="h-3 w-3 mr-1" />}
                                        {prerequisitePath?.name || prereq}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Available Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`p-4 rounded-lg border-2 ${
                          badge.earned 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">{badge.icon}</span>
                          <div>
                            <div className={`font-medium ${badge.earned ? 'text-green-800' : 'text-gray-600'}`}>
                              {badge.name}
                            </div>
                            {badge.earned && (
                              <div className="text-xs text-green-600">
                                Earned {badge.earnedDate?.toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm ${badge.earned ? 'text-green-700' : 'text-gray-500'}`}>
                          {badge.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Path Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="text-3xl mr-2">{selectedPath.badge.icon}</span>
                    {selectedPath.name}
                  </h2>
                  <p className="text-muted-foreground">{selectedPath.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <Badge className={`${getDifficultyColor(selectedPath.difficulty)} text-white`}>
                      {selectedPath.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedPath.estimatedTime}
                    </span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedPath(null)}>
                  Back to Paths
                </Button>
              </div>

              {/* Path Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Path Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round(getPathProgress(selectedPath))}%</span>
                    </div>
                    <Progress value={getPathProgress(selectedPath)} />
                    <div className="flex justify-between text-sm">
                      <span>Points Earned</span>
                      <span>{getEarnedPoints(selectedPath)} / {getTotalPoints(selectedPath)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modules */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedPath.modules.map((module, index) => (
                      <div
                        key={module.id}
                        className={`p-4 rounded-lg border-2 ${
                          module.completed 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              module.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                            }`}>
                              {module.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{module.name}</div>
                              <div className="text-sm text-muted-foreground capitalize">
                                {module.type} • {module.points} points
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getModuleIcon(module.type)}
                            <Button
                              size="sm"
                              variant={module.completed ? "secondary" : "default"}
                              disabled={module.completed}
                            >
                              {module.completed ? "Completed" : "Start"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Badge Reward */}
              <Card>
                <CardHeader>
                  <CardTitle>Path Completion Reward</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <span className="text-4xl mr-4">{selectedPath.badge.icon}</span>
                    <div>
                      <div className="font-bold text-lg">{selectedPath.badge.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Complete all modules to earn this badge and {getTotalPoints(selectedPath)} points
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}