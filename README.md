🚀 GitHub Profile Visualizer
GitHub Profile Visualizer is a responsive web application that allows users to search for any GitHub username and view detailed insights about the user’s profile, repositories, and contribution analytics using interactive charts.

🔍 Features


🔎 Search GitHub users by username


👤 View GitHub profile details


📦 List all repositories of the user


⭐ Display stars, forks, watchers, and issues for each repository


📊 Visualize contribution data using charts


Commits per quarter


Repositories per language


Commits per language


Top repositories by commits




⚠️ Graceful handling of errors and empty states


📱 Fully responsive (Mobile, Tablet & Desktop)



🛠️ Technologies Used


React JS


React Router


Context API


JavaScript (ES6+)


CSS3


Recharts (for data visualization)


React Icons


REST APIs



📊 Data Visualization
The application uses interactive charts to display GitHub analytics:


Line charts for commit trends


Donut charts for language distribution


Responsive layouts for all screen sizes



🧠 Key Concepts Implemented


Component-based architecture


API integration with async/await


Conditional rendering


Route-based navigation


State management using Context API


Loader and failure UI states


Responsive UI using CSS Flexbox and Media Queries



⚙️ Installation & Setup
# Clone the repository
git clone https://github.com/your-username/GitHub-Profile-Visualizer.git

# Navigate to project folder
cd GitHub-Profile-Visualizer

# Install dependencies
npm install

# Start the development server
npm start


📂 Folder Structure (Overview)
src/
├── components/
│   ├── Analysis
│   ├── Counter
│   ├── FailureView
│   ├── Header
│   ├── Home
│   ├── LoaderView
│   ├── NoDataView
|   ├── NotFound
|   ├── Profile
|   ├── Repositories
|   └── RepositoryItemDetails

├── context/
|   ├── GithubContext.js
│   └── GithubProvider.js
   
├── utils/
│   └── config.js
└── App.js


🌐 Live Demo
👉 Live URL: https://gitprflvisual.ccbp.tech/


👩‍💻 Author
Chandana Vadla
Frontend Developer | React JS
