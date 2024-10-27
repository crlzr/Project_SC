# 🌍 Share Circle

**Share Circle** is a community-driven platform that facilitates sharing and renting items within local neighborhoods. Whether you have extra tools, furniture, or gadgets lying around, Share Circle connects you with your neighbors, fostering a sharing economy and helping you save money while reducing waste.

## 🛠 Features

- **Borrow & Lend**: Easily lend or borrow items from your neighbors.
- **User Profiles**: Manage your profile and track your borrowing and lending activity.
- **Item Categories**: Browse items based on categories like electronics, tools, household, and more.
- **Location-Based Search**: Find items available near your location.
- **Secure Transactions**: Communicate safely and securely with neighbors to arrange item handovers.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **[Node.js](https://nodejs.org/en/)** (v14+)
- **[PostgreSQL](https://www.postgresql.org/)** (for database)
- **[Docker](https://www.docker.com/)** (optional, for containerized deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/share-circle.git
   cd share-circle
   ```

2. Install dependencies:

    ```bash
    Copy code
    npm install
    ```

3. Set up environment variables:

    Create a .env file and include the following:

    ```bash
    Copy code
    DATABASE_URL=postgresql://user:password@localhost:5432/sharecircle
    PORT=3000
    ```

4. Start the PostgreSQL database:

    Make sure PostgreSQL is running, and the database is set up. You can create the database using:

      ```bash
      Copy code
      createdb sharecircle
      ```

5. Start the application:

    bash
    Copy code
    npm start
    Visit the app in your browser:

    ```bash
    Copy code
    http://localhost:3000
    ```