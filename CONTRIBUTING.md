# Contributing to ClubConnect

Thank you for your interest in contributing to ClubConnect! We welcome contributions from the community and are excited to work with you.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions. We are committed to providing a welcoming and inspiring environment for all.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check the issue list as you might find out that you don't need to create one. When you do create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps** which reproduce the problem
- **Provide specific examples** to demonstrate those steps
- **Describe the behavior you observed** after following the steps
- **Explain which behavior you expected** to see instead and why
- **Include screenshots or GIFs** if possible
- **Include your environment** details (browser, OS, etc.)

### Feature Requests

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description** of the suggested enhancement
- **Provide specific examples** to demonstrate the steps
- **Describe the current behavior** and **expected behavior**
- **List some other applications or platforms** where this feature exists (if applicable)

### Pull Requests

- Follow the JavaScript style guide (see below)
- Include appropriate test cases
- Update documentation as needed
- Add a clear description of the changes
- Reference related issues

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/clubconnect.git
   cd clubconnect
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes
5. Test thoroughly in multiple browsers
6. Commit with clear messages:
   ```bash
   git commit -m "Add detailed description of changes"
   ```
7. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Create a Pull Request

## Style Guide

### JavaScript

- Use 2-space indentation
- Use semicolons
- Use camelCase for variables and functions
- Use PascalCase for classes and constructors
- Add JSDoc comments for functions:
  ```javascript
  /**
   * Fetches user data from the server
   * @param {string} userId - The user's unique identifier
   * @returns {Promise<Object>} User data object
   */
  async function fetchUserData(userId) {
    // implementation
  }
  ```

### HTML

- Use semantic HTML5 elements
- Use lowercase tag names
- Use 2-space indentation
- Include meaningful alt text for images
- Use descriptive id and class names

### CSS

- Use 2-space indentation
- Use lowercase class names
- Use hyphens for multi-word class names (kebab-case)
- Group related properties
- Use CSS custom properties for colors and spacing

## Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Testing

Before submitting a pull request:
- Test in Chrome, Firefox, Safari, and Edge
- Test on mobile devices and tablets
- Verify all links work correctly
- Check for console errors
- Test with and without JavaScript enabled (where applicable)

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested
- `wontfix` - This will not be worked on

## Questions?

Feel free to create an issue with the `question` label or contact the development team through our contact page.

## Recognition

Contributors will be recognized in the project's README and commit history. We appreciate your support!

---

Thank you for contributing to ClubConnect! 🎉
