# Contributing to ProMedix EMS

Thank you for your interest in contributing to ProMedix EMS! This document provides guidelines for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Testing](#testing)
6. [Submitting Changes](#submitting-changes)
7. [Code Style](#code-style)
8. [Medical Content Guidelines](#medical-content-guidelines)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background, experience level, or identity.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- PostgreSQL database
- Git
- Basic knowledge of React, TypeScript, and Express.js

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/promedix-ems.git
   cd promedix-ems
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your database configuration
   ```
5. **Initialize database**:
   ```bash
   npm run db:push
   npm run db:seed
   ```
6. **Start development server**:
   ```bash
   npm run dev
   ```

## Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-new-calculator`
- `fix/protocol-upload-bug`
- `docs/update-readme`
- `refactor/improve-database-queries`

### Commit Messages

Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(calculator): add anion gap calculator`
- `fix(auth): resolve login validation issue`
- `docs(readme): update installation instructions`
- `refactor(api): optimize database queries`

### Types of Contributions

#### 🐛 Bug Fixes
- Fix broken functionality
- Resolve TypeScript errors
- Address security vulnerabilities

#### ✨ New Features
- New medical calculators
- Additional learning modules
- Enhanced user interface components
- API improvements

#### 📚 Documentation
- Code documentation
- User guides
- API documentation
- Deployment guides

#### 🧪 Testing
- Unit tests
- Integration tests
- End-to-end tests
- Performance tests

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Requirements

- All new features must include tests
- Bug fixes should include regression tests
- Maintain test coverage above 80%
- Test both success and error scenarios

### Medical Content Testing

- Verify medical calculations with authoritative sources
- Cross-reference protocol information with current EMS standards
- Test accessibility for users with disabilities
- Validate content for accuracy and completeness

## Submitting Changes

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines
3. **Test thoroughly** including edge cases
4. **Update documentation** if needed
5. **Submit a pull request** with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots for UI changes
   - Testing notes

### Pull Request Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Medical content verified

## Related Issues
Fixes #123

## Screenshots
(If applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Documentation updated
- [ ] No new warnings introduced
```

## Code Style

### TypeScript/React Guidelines

- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Implement proper error boundaries
- Use consistent naming conventions

### File Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── __tests__/          # Test files
```

### Naming Conventions

- **Components**: PascalCase (`MedicalCalculator`)
- **Files**: kebab-case (`medical-calculator.tsx`)
- **Variables**: camelCase (`patientData`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Types**: PascalCase (`PatientData`)

### Code Quality

- Use ESLint and Prettier
- Follow accessibility guidelines (WCAG 2.1)
- Write self-documenting code
- Use meaningful variable names
- Keep functions small and focused

## Medical Content Guidelines

### Accuracy Requirements

- **Source Verification**: All medical content must be verified against authoritative sources
- **Current Standards**: Use the most recent EMS protocols and guidelines
- **Peer Review**: Medical content should be reviewed by qualified EMS professionals
- **Disclaimers**: Include appropriate medical disclaimers

### Authoritative Sources

- National Registry of Emergency Medical Technicians (NREMT)
- American Heart Association (AHA)
- National Association of Emergency Medical Technicians (NAEMT)
- Local EMS protocols (Clark County, Nevada)
- Emergency Care and Transportation of the Sick and Injured (current edition)

### Content Standards

- Use clear, professional medical terminology
- Include appropriate scope of practice considerations
- Provide context for calculations and procedures
- Include contraindications and warnings
- Follow evidence-based practice guidelines

## Development Guidelines

### Database Changes

- Use Drizzle ORM for all database operations
- Create migrations for schema changes
- Test migrations thoroughly
- Document database changes

### API Development

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement comprehensive error handling
- Include request/response validation
- Document API endpoints

### UI/UX Guidelines

- Follow mobile-first design principles
- Ensure accessibility compliance
- Use consistent styling and branding
- Test on multiple devices and browsers
- Optimize for performance

## Review Process

### Code Review Criteria

- **Functionality**: Does the code work as intended?
- **Quality**: Is the code well-structured and maintainable?
- **Performance**: Are there any performance concerns?
- **Security**: Are there any security vulnerabilities?
- **Testing**: Are there adequate tests?
- **Documentation**: Is the code properly documented?

### Medical Content Review

- **Accuracy**: Is the medical information correct?
- **Completeness**: Is all necessary information included?
- **Clarity**: Is the content clear and understandable?
- **Scope**: Is the content appropriate for the target audience?
- **Legal**: Are all disclaimers and warnings included?

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For general questions and ideas
- **Documentation**: Check existing documentation first
- **Community**: Engage with other contributors

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes
- Community acknowledgments

Thank you for contributing to ProMedix EMS and helping improve emergency medical services through technology!

---

**ProMedix EMS** - Built by the EMS community, for the EMS community