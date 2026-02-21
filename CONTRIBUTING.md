# Contributing to Salawat App

First off, thank you for considering contributing to the Salawat App! We welcome contributions from everyone, whether you are a developer, designer, or just someone who wants to help improve the project.

By contributing to this open-source project, you are helping build a robust, global platform for a noble cause. 

## 📝 Where do I start?

### 1. Bug Reports
If you spot a bug or an unexpected behavior:
- Ensure the bug was not already reported by searching on GitHub under **Issues**.
- If you're unable to find an open issue addressing the problem, open a new one using the **Bug Report** template.
- Provide detailed information: steps to reproduce, OS, browser version, and screenshots if applicable.

### 2. Feature Requests
If you have an idea to improve the app:
- Check if a similar feature was already requested.
- Open a new **Issue** using the **Feature Request** template.
- Explain clearly *why* this feature would be beneficial and *how* it should work.

---

## 💻 Development Process

If you want to contribute code, follow these standard steps:

### 1. Fork & Clone
1. **Fork** the repository on GitHub.
2. **Clone** the forked repository to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/salawat-app.git
   cd salawat-app
   ```

### 2. Branching
Create a new branch for your feature, bug fix, or refactoring:
- Use clear and descriptive branch names.
- Prefix your branch with its type, e.g., `feat/`, `fix/`, `docs/`, `refactor/`.
  ```bash
  git checkout -b feat/add-dark-mode
  ```

### 3. Coding Standards
- Write clean, maintainable, and self-documenting code.
- Ensure your code follows the existing style and architecture.
- **Lint your code** before committing:
  ```bash
  npm run lint
  ```
- Make sure there are no TypeScript errors or ESLint warnings.

### 4. Committing Changes
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
- Use prefixes like `feat:`, `fix:`, `docs:`, `chore:`.
- Example: 
  ```bash
  git commit -m "feat: implement real-time synchronization using SWR"
  ```

### 5. Open a Pull Request (PR)
1. Push your changes to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Navigate to the original repository and click **Compare & pull request**.
3. Fill out the provided **Pull Request Template** completely.
4. Link any relevant issues in your PR description (e.g., `Closes #12`).

---

## 📜 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

Thank you for your valuable time and effort!
