# react-file-demo


## Tech Staack

| Appplicaiton | language/framework |
| ------ | ------ |
| UI | node(React)|
| API | node(Express)|
| database | Microsoft Sql Server 2017|

## Starting the Application
The package consists of "docker-compose.yml" in the rooot directory, make sure docker is insalled and running on your system. If you are running on windows switch container type to "linux containers" from the taskbar.

to start the application run the below command in the root directory
```sh
docker compose up
```

the application is exposed  on http://localhost:8080

## Applicaiton Mappings

| Appplicaiton | Port Mapping |
| ------ | ------ |
| UI | 8080 |
| API | 8000 |
| database | 1433

## Sample files
sample file with data can be found in "Sample Files" directory for testing.
| files | Total Records |
| ------ | ------ |
| fr.csv | 53K |
| fr-Copy.csv | 2.3K |


####Note:
I had a busy week and was uanable to give much time to the task, so not hosting it on cloud for now. 