# FootballRegistrationForm
<img src="https://images.unsplash.com/photo-1602472097151-72eeec7a3185?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" title="" alt="unsplash.com">

<!-- [![FVCproductions](https://d3nn873nee648n.cloudfront.net/900x600/10815/12-SM307880.jpg)](https://www.imagesbazaar.com/) -->


# Football Registration Form

> A football form to register for football club.


<p align ="center">
        <!-- PROJECT SHIELDS -->
        <a href="https://vscode.dev/github/AmitKumar2301/FootballRegistrationForm">
            <img src="https://open.vscode.dev/badges/open-in-vscode.svg" alt="VS Code"></img>
        </a>
        <a href="https://github.com/AmitKumar2301/FootballRegistrationForm/">
            <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" alt="Open source"></img>
        </a>
        <br />
        <a href="https://github.com/AmitKumar2301/FootballRegistrationForm/issues">Report Bug</a> ·
        <a href="https://github.com/AmitKumar2301/FootballRegistrationForm/issues">Request Feature</a>
</p>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
<br>

![screenshot](resources/form.png)

## About The Project

A form that is used to register for a football club. It requires the user to fill basic details about himself to successfully submit the form to the server.

It validates user data on both client-side and server-side.

### Built with

This project is built using the following technologies:

#### Frontend
![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
#### Backend
![SpringBoot](https://img.shields.io/badge/Spring_Boot-329932?style=for-the-badge&logo=spring-boot)

#### Database
![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)

#### External API

<a href="https://countriesnow.space/">CountriesNow</a>

## Getting Started

The following are the steps for you to get started.

### Prerequisites
These are the requirements that needs to be fulfilled beforehand in order to run the project successfully.

<ol>
    <li><b>Java Development Kit 11</b></li>
    This project needs you to have JDK 11 or above.
    <li><b>Microsoft SQL Server</b></li>
    Any recent version of SQL Server is required to be installed.
    An empty database needs to be created within SQL Server and the same needs to be updated in the `application.properties` file.
    <li><b>IntelliJ Idea IDE (For Development)</b></li>
    IntelliJ IDEA can be used as an IDE for development and testing.
</ol>

### Installation
The following steps guide you to running up the server.
1.  Get the project files
```
https://github.com/AmitKumar2301/FootballRegistrationForm
```
2. In production, set `spring.jpa.hibernate.ddl-auto = validate` in `FootballRegistrationForm\registrationForm\src\main\resources\application.properties`
3. Get in to the project directory called `FootballRegistrationForm\registrationForm`.
4. Run the project either using the IDE or using the command-line
```shell
mvnw spring-boot:run
```
5. In the web browser, visit
```
http://localhost:8080/FootballForm.html
```
## Roadmap

- [ ] Frontend
    - [x] Basic Structure
    - [x] Applied CSS Design
    - [x] Connect to Server
    - [x] Client-side validations
    - [ ] Optimizations
- [x] Backend
    - [x] Setting REST endpoints
    - [x] Creating Basic Entities and DAO 
    - [x] Server side validations

## Contributing
Contributions are always appreciated. If you have suggestions to make this better, then please create a pull request. Thank You!

## License

GNU General Public License v3.0

---
## Contact
> GitHub [@AmitKumar2301](https://github.com/AmitKumar2301) &nbsp;&middot;&nbsp;

## Acknowledgements
Resources that helped in the journey.

- [Shields](https://shields.io)
- [Bootstrap](https://getbootstrap.com)
- [Postman](https://www.postman.com)