<h1 align="center">Filte/r/eddit</h1>

<p align="center">
  <img src="https://github.com/user-attachments/assets/f109cfef-6617-4884-8b21-a086367d3d87" width="400">
</p>

<p align="center">Filter topics such as politics, sports, news etc. from Reddit using a trained AI model</p>

## Training

The model was trained using the datasets [News Category Dataset](https://www.kaggle.com/datasets/rmisra/news-category-dataset) by Risabh Misra and [News Articles Classification Dataset for NLP & ML](https://www.kaggle.com/datasets/banuprakashv/news-articles-classification-dataset-for-nlp-and-ml) by Banuprakash V. The categories have been simplified to business, education, entertainment, food, news, parenting, politics, science, sports, style & beauty, technology, travel, wellness, and women & minorities. The accuracy of the model is 69%.

```
                    precision    recall  f1-score   support

          business       0.65      0.55      0.60      1895
         education       0.78      0.63      0.70       824
     entertainment       0.67      0.76      0.71      7816
              food       0.78      0.73      0.75      1679
              news       0.53      0.48      0.51      4534
         parenting       0.71      0.66      0.68      2525
          politics       0.74      0.83      0.78      9500
           science       0.65      0.31      0.41       429
            sports       0.77      0.66      0.71      1431
    style & beauty       0.81      0.73      0.77      2416
        technology       0.75      0.54      0.63       787
            travel       0.76      0.69      0.72      2034
          wellness       0.68      0.79      0.73      4905
women & minorities       0.64      0.47      0.54      3131

          accuracy                           0.69     43906
         macro avg       0.71      0.63      0.66     43906
      weighted avg       0.69      0.69      0.69     43906
```

## Tech stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

## Live hosting

> [!IMPORTANT]
> If you refresh the site too often, you will reach the Reddit API limit.
> 
> If no posts are shown, wait a while before visiting the site again.

The frontend and backend are both hosted on [Render](https://render.com/).

The site can be viewed at [filtereddit.onrender.com](https://filtereddit.onrender.com).

## Self-hosting

### Prerequisites

[Node.js](https://nodejs.org/en/download) and [Python](https://www.python.org/downloads/) should be installed. Then, clone the repo.

```
git clone https://github.com/svhl/filtereddit
cd filtereddit
```

Install the required modules and generate CSS for frontend with

```
cd frontend
npm install
npx tailwindcss-cli -i ./src/index.css -o ./src/output.css
```

and for backend with

- Windows

```
cd backend
py -m venv venv
venv\Scripts\activate
```

Set the Python interpreter in VS Code by going to Command Palette (ctrl + shift + p) -> Python: Select Interpreter -> `backend\venv\Scripts\python.exe`, and run

```
pip install -r requirements.txt
```

- Linux

```
cd backend
py -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Running

Start the backend with

```
cd backend
py app.py
```

and the frontend with

```
cd frontend
npm run dev
```

The site can be viewed at [http://localhost:5173](http://localhost:5173).
