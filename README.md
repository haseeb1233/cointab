# cointab



## Deplolyed App
-Frontend:https://transcendent-naiad-d47431.netlify.app/ <br>
-Backend: https://cointab-755u.onrender.com <br>
-Database:Amazon RDS(MySQL) 

## Directory Structure
```bash
cointab/
├─ backend/
├─ frontend/
│  ├─ ...
```




## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running. config the database with your username and password and host in config.json

```bash
npm install
cd front-end
npm start
```


## API Endpoints
GET /api/users - retrieve all users added from database(eg:https://cointab-755u.onrender.com/users) <br>
POST /api/users - post a specific user to database<br>
POST /api/posts - add a  all post of specific user to database <br>
get /api/users - get a specific user posts from database


## Technology Stack
List and provide a brief overview of the technologies used in the project.

  Backend
- Node.js
- Express.js
- Amazon RDS (Mysql)-Database
- Sequelize (Orm)
  
Frontend
- React.js
- Tailwind.css
- XLXS and SaveAS (for converting to excel)
