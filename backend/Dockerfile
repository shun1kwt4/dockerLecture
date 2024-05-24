FROM python:3
 
WORKDIR /backend
# COPY requirements.txt ./
 
RUN pip3 install Flask==2.2.5
RUN pip3 install Flask-Cors==3.0.10
RUN pip3 install flask_restful==0.3.9
RUN pip3 install axios
RUN pip3 install mysql-connector-python
RUN pip3 install mysql-connector-python bcrypt

CMD ["python3", "app.py"]