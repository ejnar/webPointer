
# README
#### Version: 0.9.8.0.3


### Backlogg ---------
  
   * minimize weight on right side slide song menu
   * add right side slide song menu on slide show page
   * update key change 
   * add func for remove keys on slide show
   * filter on public list page 
   * adapt menu icon on song vy page
   * fix md-virtual-repeat-container on songlist
   * change authority to a list on UserDetail  - in test state



#### Gradle

Build project files for IDE

./gradlew idea --refresh-dependencies

./gradlew build

./gradlew assemble --refresh-dependencies

./gradlew -Dgrails.env=prod assemble --refresh-dependencies

./gradlew karmaRun -PkarmaDebug=true --refresh-dependencies

./gradlew karmaRun -PkarmaDebug=true --debug --stacktrace

#### Grails command

 * grails prod war
 * grails dependency-report 
 * grails create-app webpoint --profile angularjs --features mongodb, asset-pipeline, json-views, security 


#### Karma Test

Task   |  Description
--- | --- 
karmaRun |      Runs your tests
karmaWatch |    Runs your tests in watch mode
karmaRefresh |  Refresh the generated karma config file
karmaClean |    Deletes the karma config file and removes the dependencies

#### Test
| | 
| --- | 
| **Unit** | 
|test-app -unit se.webpoint.data.UserServiceSpec |
|test-app -unit:javascript ChangeKeyServiceSpec  |
|test-app -unit:javascript RemoveKeyServiceSpec  |
|test-app -unit:javascript -echoOut              |
|**Integration**|
|test-app -integration se.webpoint.data.UserServiceSpec |



#### Client Tasks clientDependencies
The plugin adds the following tasks to your build:
https://github.com/craigburke/client-dependencies-gradle

Description
clientInstall: Installs all the client dependencies you have set in your build.gradle
clientRefresh: Refreshes client dependencies (if you add or modify your configuration)
clientClean: Removes client dependencies and clears the cache
clientReport: Prints a report of all dependencies and the resolved versions

#### SDK
Description   |  Command
--- | --- 
Update Grails  |   sdk list grails


#### JBoss modifications
--- build.gradle ---
runtime 'javax.xml.bind:jaxb-api:2.2.12'
provided "org.springframework.boot:spring-boot-starter-tomcat"

Add: src/main/webapp/WEB-INF/jboss-deployment-structure.xml


#### Mongo
* Db dump
 - mongodump
 - mongorestore

mongodump --db database_name
mongorestore --db database_name path_to_bson_file

mongodump -h 127.0.0.1 -u user -p pass --db webpoint --port 00000 --out /Users/admin/dump/fold

db.section.find( {"title": /Du är underbar/, "publish": true} )


#### Node
 Update Node

 - node -v
 - sudo npm cache clean -f
 - sudo npm install -g n
 - sudo n stable

#### Docker:

----------------------------Command------------------------- |  Description 
--- | ---
docker-compose -f docker-composer.yml up -d|Recreate and restart
docker-compose -f docker-composer.yml down|Shutdown
docker ps|View procces
docker container ls|View procces
docker-compose build|Verify changes in Dockerfile and recreate
docker exec -it [container_ref] bash|Enter container
docker run -d -p 8080:8080 me/myapp|Access the exposed port 8080 on your host system, e.g. point your browser at http://localhost:8080/ 4
    
### Java
jar -xvf sample.war

### Spring
 
 Security:
 s2-quickstart  se.webpoint.auth User Role --groupClassName=RoleGroup


 ##### Shortcute

 Keys
 cmd -  Comment/uncomment with line comment
 cmd alt -
 
 ##### Util
 
  ps -aux
  kill -9 <PID<
  
  
  
  