# StudentAssessment
Basic API which is used to assess students on the basis of three scores

# Step to execute above code

# Database(MySQL):
1) Create database with name "Candidate"
2) Create three tables as  
    create table candidate(candidateNo int(5) primary key auto_increment, candidateName varchar(500) not null, candidateEmail varchar(100) not null);
    create table test_score(candidateNo int(5) not null, first_round int(2) not null, second_round int(2) not null, third_round int(2) not null, total_score int(2) default 0, foreign key(candidateNo) references Candidate(candidateNo));

# Terminal
## $npm i
## $npm start

Enjoy
