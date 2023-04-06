const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const informationElement = document.getElementById('information');
const explanationElement = document.getElementById('explanation');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
var count = 0;
var total = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

async function loadQuestions() {
  let questions = [
    {
        "topic": "Architecture and Concepts",
        "category": "Least privilege",
        "level": "beginner",
        "question": "What is least privilege?",
        "answers": [
            {
                "a1": "A cybersecurity concept where users are granted the maximum levels of access and privileges they need to perform their job functions."
            },
            {
                "a2": "A cybersecurity concept where users are granted the minimum levels of access and privileges they need to perform their job functions."
            },
            {
                "a3": "A cybersecurity concept where users have no restrictions when it comes to accessing sensitive data."
            },
            {
                "a4": "A cybersecurity concept that is not relevant to modern security practices."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Granting maximum access to users can increase the risk of unauthorized access and limit the potential impact of a security breach."
            },
            {
                "a2": "Correct. Least privilege is an essential concept in cybersecurity where a user is granted the minimum levels of access and privileges they need to perform their job functions. This approach mitigates the risk of unauthorized access and limits the potential impact of a security breach."
            },
            {
                "a3": "Incorrect. Granting unlimited access to sensitive data is extremely risky and can lead to severe security breaches."
            },
            {
                "a4": "Incorrect. Least privilege is a crucial security concept that is implemented across industries and organizations worldwide."
            }
        ]
    },
    {
        "topic": "Social Media",
        "category": "Staying Safe on Social Media",
        "level": "expert",
        "question": "What should you do if someone you know shares fake news on social media?",
        "answers": [
            {
                "a1": "Correct their misinformation publically"
            },
            {
                "a2": "Call them out and shame them"
            },
            {
                "a3": "Share the fake news with others to expose it"
            },
            {
                "a4": "Private message them and share your concerns"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. It's essential to correct misinformation, but doing it publicly can backfire and damage relationships."
            },
            {
                "a2": "Incorrect. Calling someone out and shaming them publicly can create a hostile environment and damage relationships."
            },
            {
                "a3": "Incorrect. Sharing fake news to expose it is not effective, as it will only spread the fake news further."
            },
            {
                "a4": "Correct! Private messaging and sharing your concerns is the best way to approach someone you know who shares fake news. It's important to be gentle and respectful and provide factual information to help them understand their mistake."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Security culture and shift-left",
        "level": "advanced",
        "question": "What is the purpose of implementing a strong security culture and shift-left approach?",
        "answers": [
            {
                "a": "To increase productivity during the software development process"
            },
            {
                "b": "To reduce the cost of software development"
            },
            {
                "c": "To reduce risks and protect sensitive data"
            },
            {
                "d": "To speed up the software release process"
            }
        ],
        "correct_answer": "c",
        "explanations": [
            {
                "a": "Incorrect. While a strong security culture and shift-left approach may increase productivity, that is not their primary purpose."
            },
            {
                "b": "Incorrect. While a strong security culture and shift-left approach may reduce the cost of software development, that is not their primary purpose."
            },
            {
                "c": "Correct. The purpose of a strong security culture and shift-left approach is to reduce risks and protect sensitive data."
            },
            {
                "d": "Incorrect. While a strong security culture and shift-left approach may speed up the software release process, that is not their primary purpose."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Product risk profiles",
        "level": "advanced",
        "question": "What is the purpose of identifying potential risks early in the product development process?",
        "answers": [
            {
                "a1": "To eliminate all risks associated with the product."
            },
            {
                "a2": "To make informed decisions about product design and safety measures."
            },
            {
                "a3": "To speed up the product development process."
            },
            {
                "a4": "To reduce manufacturing costs."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. It is nearly impossible to eliminate all risks associated with a product."
            },
            {
                "a2": "Correct. Identifying potential risks early in the product development process allows companies to make informed decisions about product design and safety measures to reduce the likelihood of negative outcomes."
            },
            {
                "a3": "Incorrect. Identifying potential risks early in the product development process may not necessarily speed up the process."
            },
            {
                "a4": "Incorrect. Identifying potential risks early in the product development process may not necessarily reduce manufacturing costs."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Incident Response",
        "level": "intermediate",
        "question": "What is the difference between incident response and disaster recovery?",
        "answers": [
            {
                "a1": "Incident response is a proactive process, while disaster recovery is a reactive process."
            },
            {
                "a2": "Incident response is focused on restoring service as quickly as possible, while disaster recovery is focused on long-term mitigation."
            },
            {
                "a3": "Incident response deals with incidents caused by malicious actors, while disaster recovery deals with incidents caused by natural disasters."
            },
            {
                "a4": "Incident response is performed by security analysts, while disaster recovery is performed by IT operations staff."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Both incident response and disaster recovery are reactive processes, but incident response deals with unexpected events that disrupt normal operations, while disaster recovery deals with the aftermath of a catastrophic event such as a natural disaster."
            },
            {
                "a2": "Correct. Incident response is aimed at resolving incidents as quickly as possible, while disaster recovery is focused on restoring normal operations over a longer period of time and preventing future incidents."
            },
            {
                "a3": "Incorrect. Both incident response and disaster recovery can deal with incidents caused by various factors, including malicious actors and natural disasters."
            },
            {
                "a4": "Incorrect. Both incident response and disaster recovery can involve different roles and responsibilities depending on the organization's structure and the nature of the incident."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Authentication Architecture",
        "level": "expert",
        "question": "Explain the role of Identity Providers (IdPs) in Authentication Architecture.",
        "answers": [
            {
                "a1": "IdPs are responsible for managing user authentication and authorization for all applications and services provided by the organization."
            },
            {
                "a2": "IdPs are responsible for managing user authentication and authorization for a specific application or service."
            },
            {
                "a3": "IdPs are only used for external users, while internal users are managed through Active Directory or LDAP."
            },
            {
                "a4": "IdPs are a legacy technology that has been replaced by modern authentication methods such as OAuth and OpenID Connect."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Identity Providers (IdPs) are responsible for managing user authentication and authorization for all applications and services provided by the organization. They act as a central point of control and trust for user identities within the organization."
            },
            {
                "a2": "Incorrect. IdPs are responsible for managing user authentication and authorization for all applications and services provided by the organization, not just a specific application."
            },
            {
                "a3": "Incorrect. IdPs are used for both external and internal users, and can integrate with existing user directories such as Active Directory or LDAP."
            },
            {
                "a4": "Incorrect. IdPs are still an integral part of Authentication Architecture and work alongside modern authentication methods such as OAuth and OpenID Connect."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Malware",
        "level": "advanced",
        "question": "What is a rootkit?",
        "answers": [
            {
                "a1": "A type of malware that spreads through email attachments"
            },
            {
                "a2": "A type of malware that disguises itself as a legitimate program"
            },
            {
                "a3": "A type of malware that gains administrative-level access to a computer"
            },
            {
                "a4": "A type of malware that changes a computer's browser homepage"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. A rootkit doesn't typically spread through email attachments."
            },
            {
                "a2": "Incorrect. A rootkit can disguise itself as a legitimate program, but this is not the main characteristic."
            },
            {
                "a3": "Correct. A rootkit is a type of malware that gains administrative-level access to a computer, allowing it to perform various malicious activities."
            },
            {
                "a4": "Incorrect. Changing the browser homepage is not a characteristic of a rootkit."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Static Application Security Testing (SAST)",
        "level": "beginner",
        "question": "What is the purpose of Static Application Security Testing (SAST) tools?",
        "answers": [
            {
                "a1": "To identify security risks early in the development cycle"
            },
            {
                "a2": "To deploy code quicker"
            },
            {
                "a3": "To analyze code after it has been deployed"
            },
            {
                "a4": "To improve the overall performance of an application"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. SAST tools are used to identify potential security risks in source code before it is deployed, enabling developers to manage vulnerabilities early in the development cycle."
            },
            {
                "a2": "Incorrect. SAST tools do not assist with deploying code but are used to identify potential security risks."
            },
            {
                "a3": "Incorrect. SAST tools are used to evaluate source code and identify potential security risks before deployment."
            },
            {
                "a4": "Incorrect. SAST tools are used to analyze the security of code, not its performance."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Staying Secure in your Workplace",
        "level": "beginner",
        "question": "What is an example of a good password?",
        "answers": [
            {
                "a1": 123456
            },
            {
                "a2": "pa$$w0rd"
            },
            {
                "a3": "c@t_l0ver!"
            },
            {
                "a4": "Correct Horse Battery Staple"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. This is a very common and easily guessed password."
            },
            {
                "a2": "Incorrect. This password is easily guessed by hackers and is not strong."
            },
            {
                "a3": "Correct. A good password should be a combination of upper and lowercase letters, numbers, and special characters. It should not contain easily guessed information like birth dates or common words."
            },
            {
                "a4": "Incorrect. While this type of password may seem strong, it is actually easily guessed by hackers using dictionary attacks."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Session Management Architecture",
        "level": "expert",
        "question": "What are some best practices for securely managing user sessions?",
        "answers": [
            {
                "a1": "Use strong session IDs and regenerate them periodically"
            },
            {
                "a2": "Implement session expiration policies"
            },
            {
                "a3": "Store session data securely and protect against unauthorized access"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Strong session IDs that are randomly generated and periodically regenerated can help prevent session hijacking."
            },
            {
                "a2": "Correct. Session expiration policies can help ensure that inactive sessions are not left open for too long, reducing the risk of session hijacking."
            },
            {
                "a3": "Correct. Storing session data securely and protecting against unauthorized access can help prevent session hijacking and data breaches."
            },
            {
                "a4": "Correct. Using a combination of best practices, such as strong session IDs, expiration policies, and secure data storage, can provide a more robust approach to securely managing user sessions."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Authentication Architecture",
        "level": "advanced",
        "question": "What is the difference between SSO and MFA?",
        "answers": [
            {
                "a1": "SSO enables users to access multiple applications with a single set of credentials, while MFA requires users to provide multiple factors of authentication for access."
            },
            {
                "a2": "SSO requires users to provide multiple factors of authentication for access, while MFA enables users to access multiple applications with a single set of credentials."
            },
            {
                "a3": "SSO and MFA are the same thing and can be used interchangeably."
            },
            {
                "a4": "SSO and MFA are both outdated technologies that are not used anymore."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. SSO enables users to access multiple applications with a single set of credentials, while MFA requires users to provide multiple factors of authentication for access."
            },
            {
                "a2": "Incorrect. The answer describes the opposite of SSO and MFA."
            },
            {
                "a3": "Incorrect. SSO and MFA are different methods of authentication and cannot be used interchangeably."
            },
            {
                "a4": "Incorrect. SSO and MFA are widely used technologies in Authentication Architecture and are constantly evolving to address new security challenges."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Secret scanning tools",
        "level": "intermediate",
        "question": "Which of the following is an example of a secret scanning tool?",
        "answers": [
            {
                "a1": "Microsoft Excel"
            },
            {
                "a2": "Google Chrome"
            },
            {
                "a3": "Wireshark"
            },
            {
                "a4": "Adobe Photoshop"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Microsoft Excel is not a secret scanning tool, but can be used to store and organize sensitive information."
            },
            {
                "a2": "Incorrect. Google Chrome is a web browser, but not a secret scanning tool."
            },
            {
                "a3": "Correct! Wireshark is a secret scanning tool used to analyze network traffic and identify security vulnerabilities."
            },
            {
                "a4": "Incorrect. Adobe Photoshop is a graphic design software, but not a secret scanning tool."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Secret scanning tools",
        "level": "expert",
        "question": "Which secret scanning tool is commonly used for automated testing?",
        "answers": [
            {
                "a1": "Nmap"
            },
            {
                "a2": "OpenVAS"
            },
            {
                "a3": "Nikto"
            },
            {
                "a4": "Nessus"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Nmap is a network exploration tool that scans hosts and services on a network, but is not exclusively used for secret scanning."
            },
            {
                "a2": "Incorrect. OpenVAS is an open-source vulnerability scanner that can be used for secret scanning, but is not necessarily used for automated testing."
            },
            {
                "a3": "Incorrect. Nikto is a web server scanner that checks for vulnerabilities on a web server, but is not commonly used for automated testing."
            },
            {
                "a4": "Correct! Nessus is a commonly used secret scanning tool for automated testing because it can scan large networks for vulnerabilities and delivers automatic updates."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Social Media Safety",
        "level": "intermediate",
        "question": "What is a common phishing method on social media platforms?",
        "answers": [
            {
                "a": "Direct messaging users to enter personal information on a fake website"
            },
            {
                "b": "Asking users to share posts in order to win a prize"
            },
            {
                "c": "Displaying pop-up ads with malicious links"
            },
            {
                "d": "Creating fake social media profiles to access other users' information"
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Phishing involves tricking users into entering personal information on fake websites or through impersonated communication from a trusted source."
            },
            {
                "b": "Incorrect. While asking users to share posts can be a method of social engineering, it is not specifically phishing."
            },
            {
                "c": "Incorrect. Pop-up ads with malicious links are a form of malware, not phishing."
            },
            {
                "d": "Incorrect. Creating a fake social media profile is one way of attempting to steal information, but it is not phishing."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Credential Stuffing",
        "level": "advanced",
        "question": "What are some common ways hackers obtain usernames and passwords for credential stuffing attacks?",
        "answers": [
            {
                "a": "Phishing attacks, where hackers trick users into giving away their login credentials."
            },
            {
                "b": "Data breaches, where hackers steal large amounts of user data from companies and organizations."
            },
            {
                "c": "Brute force attacks, where hackers use automated tools to guess passwords."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Partially correct. Phishing attacks can be a way for hackers to obtain usernames and passwords, but it is not the only method."
            },
            {
                "b": "Partially correct. Data breaches are a common way for hackers to obtain large amounts of user data, including login credentials."
            },
            {
                "c": "Partially correct. Brute force attacks can be effective for guessing weak passwords."
            },
            {
                "d": "Correct. Hackers can use any combination of these methods to obtain usernames and passwords for credential stuffing attacks."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Account Takeover",
        "level": "beginner",
        "question": "What is account takeover?",
        "answers": [
            {
                "a": "A form of cyber attack where hackers gain authorized access to a user's online account."
            },
            {
                "b": "An online account where users can take over other accounts."
            },
            {
                "c": "A type of social engineering scam."
            },
            {
                "d": "A website for reporting cyber attacks."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Account takeover is a form of cyber attack where hackers gain unauthorized access to a user's online account."
            },
            {
                "b": "Incorrect. A user cannot take over other accounts."
            },
            {
                "c": "Incorrect. Account takeover is not a social engineering scam, but attackers can use social engineering to obtain login credentials."
            },
            {
                "d": "Incorrect. Reporting cyber attacks is important, but account takeover is not a website for it."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Workplace Security",
        "level": "expert",
        "question": "What is the difference between a vulnerability assessment and a penetration test in cybersecurity?",
        "answers": [
            {
                "a": "A vulnerability assessment identifies vulnerabilities in a system or network, while a penetration test introduces attacks to see how the system responds."
            },
            {
                "b": "A penetration test identifies vulnerabilities in a system or network, while a vulnerability assessment introduces attacks to see how the system responds."
            },
            {
                "c": "A vulnerability assessment and a penetration test are the same thing."
            },
            {
                "d": "A vulnerability assessment is only used for physical security, while a penetration test is used for cybersecurity."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. A vulnerability assessment is the process of identifying vulnerabilities in a system or network, while a penetration test is the process of introducing attacks to see how the system responds. The goal of a penetration test is to simulate a real-world attack and test the effectiveness of an organization's security controls."
            },
            {
                "b": "Incorrect. This describes the opposite of what a vulnerability assessment and a penetration test are."
            },
            {
                "c": "Incorrect. A vulnerability assessment and a penetration test are not the same thing, although they are related concepts."
            },
            {
                "d": "Incorrect. Both vulnerability assessments and penetration tests can be used for both physical and cybersecurity."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Access Control Architecture",
        "level": "intermediate",
        "question": "What is the difference between authentication and authorization?",
        "answers": [
            {
                "a": "Authentication is the process of verifying the identity of a user, and authorization is the process of verifying that the user has the necessary permissions to access a resource."
            },
            {
                "b": "Authentication is the process of identifying the type of resource to be accessed, and authorization is the process of verifying that the user has the necessary permissions to access a resource."
            },
            {
                "c": "Authentication and authorization are the same processes and have no differences between them."
            },
            {
                "d": "None of the above."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Authentication verifies the identity of the user, whereas authorization checks if that user has the necessary privileges to access a resource."
            },
            {
                "b": "Incorrect. This option reverses the meanings of authentication and authorization."
            },
            {
                "c": "Incorrect. Authentication and authorization are not the same processes. They have different purposes and require different mechanisms to be fulfilled."
            },
            {
                "d": "Incorrect. The correct option is a."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Microservice Architectures",
        "level": "advanced",
        "question": "What are some common issues encountered when implementing microservice architectures?",
        "answers": [
            {
                "a1": "Difficulty in maintaining data consistency across multiple services"
            },
            {
                "a2": "Integration problems between different services"
            },
            {
                "a3": "Increased complexity in deploying and running services"
            },
            {
                "a4": "Security and safety concerns"
            }
        ],
        "correct_answer": [
            "a1",
            "a2",
            "a3",
            "a4"
        ],
        "explanations": [
            {
                "a1": "Correct. With multiple services, maintaining data consistency across all of them can become more challenging."
            },
            {
                "a2": "Correct. Integrating different services can become difficult, as dependencies between services can make changes carried out to one service impact others."
            },
            {
                "a3": "Correct. Deploying and running services can be more intricate than in a monolithic application, as there is now a greater number of components that require maintenance and monitoring."
            },
            {
                "a4": "Correct. More services mean more microservices to secure, which may introduce problems around risk mitigation and safety concerns like system resilience."
            }
        ]
    },
    {
        "topic": "Access Control",
        "category": "RBAC vs ABAC vs ReBAC",
        "level": "beginner",
        "question": "What does RBAC stand for?",
        "answers": [
            {
                "a1": "Rule-Based Access Control"
            },
            {
                "a2": "Role-Based Access Control"
            },
            {
                "a3": "Relationship-Based Access Control"
            },
            {
                "a4": "Random-Based Access Control"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Rule-Based Access Control is not one of the access control types described."
            },
            {
                "a2": "Correct. RBAC stands for Role-Based Access Control, which restricts access based on job function."
            },
            {
                "a3": "Incorrect. Relationship-Based Access Control is another access control type described, but not what RBAC stands for."
            },
            {
                "a4": "Incorrect. Random-Based Access Control is not one of the access control types described."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Input and Output Architecture",
        "level": "advanced",
        "question": "What are some common input/output devices in a computer system?",
        "answers": [
            {
                "a1": "Keyboard and mouse"
            },
            {
                "a2": "Display and printer"
            },
            {
                "a3": "Scanner and microphone"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. Keyboard and mouse are input devices, but not output devices."
            },
            {
                "a2": "Partially correct. Display and printer are output devices, but not input devices."
            },
            {
                "a3": "Partially correct. Scanner and microphone are input devices, but not output devices."
            },
            {
                "a4": "Correct. All of the listed devices are common input and/or output devices in a computer system."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Avoiding Ransomware",
        "level": "expert",
        "question": "What is \"zero-day\" ransomware?",
        "answers": [
            {
                "a1": "Ransomware that is activated 0 days after infection"
            },
            {
                "a2": "Ransomware that uses previously unknown vulnerabilities to infect systems"
            },
            {
                "a3": "Ransomware that targets systems built using open-source software"
            },
            {
                "a4": "Ransomware that has multiple encryption layers for added security"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. The term \"zero-day\" does not refer to a specific time period after infection."
            },
            {
                "a2": "Correct. Zero-day ransomware is a type of ransomware that exploits previously unknown vulnerabilities in software to infect computer systems. Because the vulnerabilities are unknown to software vendors, they cannot immediately release a patch to fix the vulnerability."
            },
            {
                "a3": "Incorrect. Ransomware that targets systems built using open-source software is not specifically called \"zero-day\" ransomware."
            },
            {
                "a4": "Incorrect. Ransomware that has multiple layers of encryption for added security is not specifically called \"zero-day\" ransomware."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "API Architecture",
        "level": "expert",
        "question": "What is Hypermedia as the Engine of Application State (HATEOAS)?",
        "answers": [
            {
                "a1": "A principle of RESTful architecture that requires each request to contain all the necessary information."
            },
            {
                "a2": "A tool used for service discovery and registration, load balancing, and routing."
            },
            {
                "a3": "A way to enable the server to instruct clients about available actions and state transitions."
            },
            {
                "a4": "A security protocol used for encrypting and authenticating API requests and responses."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. While this is a principle of RESTful architecture, it's not specifically related to HATEOAS."
            },
            {
                "a2": "Incorrect. This sounds like a description of a service mesh, which is not specifically related to HATEOAS."
            },
            {
                "a3": "Correct! HATEOAS is a way to enable the server to instruct clients about available actions and state transitions. This helps to make the API more self-descriptive, and can reduce the amount of coupling between the client and server."
            },
            {
                "a4": "Incorrect. This sounds like a description of HTTPS, which is not specifically related to HATEOAS."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Sharing Data and Documents Securely",
        "level": "advanced",
        "question": "Which of the following protocols provides end-to-end encryption for email messages?",
        "answers": [
            {
                "a": "Hypertext Transfer Protocol (HTTP)"
            },
            {
                "b": "Simple Mail Transfer Protocol (SMTP)"
            },
            {
                "c": "Post Office Protocol 3 (POP3)"
            },
            {
                "d": "Pretty Good Privacy (PGP)"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Incorrect. HTTP is not a protocol for email messages, but it is used for web page connections."
            },
            {
                "b": "Incorrect. SMTP is a protocol for sending email messages, but it does not provide encryption."
            },
            {
                "c": "Incorrect. POP3 is a protocol for retrieving email messages, but it does not provide encryption."
            },
            {
                "d": "Correct. PGP provides end-to-end encryption for email messages, ensuring that only the intended recipient can read the message."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "PASTA",
        "level": "expert",
        "question": "In PASTA's Attack Library, what is the difference between an Attack Method and an Attack Vector?",
        "answers": [
            {
                "a1": "An Attack Method describes the specific technique used in an Attack Vector"
            },
            {
                "a2": "An Attack Vector describes the specific technique used in an Attack Method"
            },
            {
                "a3": "Both terms refer to the same thing in the Attack Library"
            },
            {
                "a4": "Neither term is used in the Attack Library"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. An Attack Vector is a path or means used by an attacker to gain unauthorized access to a system, while an Attack Method is a specific technique used to carry out an attack via an Attack Vector. For example, SQL Injection can be an Attack Method used via an Attack Vector of an input form."
            },
            {
                "a2": "Incorrect. See explanation for option A."
            },
            {
                "a3": "Incorrect. See explanation for option A."
            },
            {
                "a4": "Incorrect. The Attack Library is a core component of the PASTA methodology and contains a catalog of known attacks that can be used during the Threat Simulation step."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Smishing",
        "level": "advanced",
        "question": "How can you avoid becoming the target of a smishing attack?",
        "answers": [
            {
                "a1": "Avoid clicking on links from unknown or suspicious sources."
            },
            {
                "a2": "Never provide sensitive information via text message."
            },
            {
                "a3": "Use two-factor authentication on accounts that offer it."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. This is a way to avoid falling for a smishing attack."
            },
            {
                "a2": "Correct. This is a way to avoid falling for a smishing attack."
            },
            {
                "a3": "Correct. This is a proactive measure that can help protect against a range of attacks."
            },
            {
                "a4": "Correct. All of the listed answers can help avoid becoming the target of a smishing attack."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Vishing (Voice Phishing)",
        "level": "beginner",
        "question": "What is vishing?",
        "answers": [
            {
                "a1": "Stealing money from victim's accounts."
            },
            {
                "a2": "Divulging personal details over the phone."
            },
            {
                "a3": "An offensive technique used to commit identity theft."
            },
            {
                "a4": "Deceiving victims over the phone by posing as legitimate individuals."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Vishing involves stealing money from victim's accounts by posing as legitimate individuals over the phone."
            },
            {
                "a2": "Incorrect. Vishing involves tricking victims into divulging personal details over the phone by posing as legitimate individuals."
            },
            {
                "a3": "Incorrect. Vishing is an offensive technique used to steal money from victim's accounts or commit identity theft."
            },
            {
                "a4": "Correct. Vishing involves deceiving victims over the phone by posing as legitimate individuals and tricking them into divulging sensitive information."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "CI-CD tools",
        "level": "intermediate",
        "question": "What is the main benefit of using a CI/CD tool like Jenkins?",
        "answers": [
            {
                "a1": "Reduced errors and bugs in the final product"
            },
            {
                "a2": "Faster delivery of product updates and features"
            },
            {
                "a3": "Increased collaboration and communication among development teams"
            },
            {
                "a4": "Better management of project timelines and deadlines"
            }
        ],
        "correct_answer": [
            "a2"
        ],
        "explanations": [
            {
                "a1": "While this is a benefit, it's not the primary benefit of using Jenkins or other CI/CD tools."
            },
            {
                "a2": "Correct! One of the main benefits of using a CI/CD tool is the ability to deliver product updates and features more quickly."
            },
            {
                "a3": "While improved collaboration is a secondary benefit, it's not the primary reason for using these tools."
            },
            {
                "a4": "Project management is not the focus of CI/CD tools."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Social Engineering",
        "level": "advanced",
        "question": "What is the difference between phishing and spear phishing?",
        "answers": [
            {
                "a1": "Phishing targets individuals, while spear phishing targets groups or organizations."
            },
            {
                "a2": "Phishing is done through email, while spear phishing is done through social media."
            },
            {
                "a3": "Phishing is random, while spear phishing is targeted."
            },
            {
                "a4": "Phishing is easier to detect, while spear phishing is more difficult to detect."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Both phishing and spear phishing can target individuals or groups/organizations."
            },
            {
                "a2": "Incorrect. Both phishing and spear phishing can be done through various mediums, including email and social media."
            },
            {
                "a3": "Correct. Phishing is random and targets a large number of people, while spear phishing is targeted towards specific individuals or groups and uses personalized information to trick them."
            },
            {
                "a4": "Incorrect. Spear phishing uses personalized information and is often more convincing than phishing, making it more difficult to detect."
            }
        ]
    },
    {
        "topic": "Access Control",
        "category": "RBAC vs ABAC vs ReBAC",
        "level": "advanced",
        "question": "What are some advantages of ReBAC over RBAC and ABAC?",
        "answers": [
            {
                "a1": "ReBAC offers fine-grained access control and considers relationships, which are not features of RBAC or ABAC."
            },
            {
                "a2": "ReBAC offers less fine-grained access control than RBAC and ABAC."
            },
            {
                "a3": "ReBAC is only applicable to small organizations."
            },
            {
                "a4": "ReBAC is less secure than RBAC and ABAC."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. ReBAC considers relationships between individuals and entities, which provides more fine-grained access control than RBAC and ABAC."
            },
            {
                "a2": "Incorrect. ReBAC offers more fine-grained access control than RBAC and ABAC."
            },
            {
                "a3": "Incorrect. ReBAC can be implemented in organizations of any size."
            },
            {
                "a4": "Incorrect. ReBAC is as secure as RBAC and ABAC, if properly implemented."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Social Engineering",
        "level": "beginner",
        "question": "What is Social Engineering?",
        "answers": [
            {
                "a1": "A method of hacking that targets human vulnerabilities."
            },
            {
                "a2": "A type of phishing email."
            },
            {
                "a3": "A form of technical security measure."
            },
            {
                "a4": "An online impersonation scam."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Social Engineering refers to the art of manipulating individuals to divulge confidential information by tricking them into trusting the attacker."
            },
            {
                "a2": "Incorrect. Social Engineering is not limited to phishing emails."
            },
            {
                "a3": "Incorrect. Technical security measures and Social Engineering are not the same thing."
            },
            {
                "a4": "Incorrect. Social Engineering is not limited to online impersonation scams."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Information Security",
        "level": "intermediate",
        "question": "What is the purpose of using SSL/TLS encryption in online transactions?",
        "answers": [
            {
                "a1": "To authenticate the user"
            },
            {
                "a2": "To authorize the user"
            },
            {
                "a3": "To create a secure session"
            },
            {
                "a4": "To prevent spam"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Authentication refers to verifying the identity of the user who is accessing a system."
            },
            {
                "a2": "Incorrect. Authorization refers to the process of granting or denying access to resources based on the user's identity and privileges."
            },
            {
                "a3": "Correct. SSL (secure sockets layer) and TLS (transport layer security) encryption are protocols that create a secure session between a client and a server over the Internet to protect sensitive data from interception or eavesdropping."
            },
            {
                "a4": "Incorrect. Preventing spam is not the main purpose of SSL/TLS encryption."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Physical Safety",
        "level": "intermediate",
        "question": "Which of the following is an example of physical safety hazards?",
        "answers": [
            {
                "a": "Tripping over an electric cord"
            },
            {
                "b": "Losing a file on a computer"
            },
            {
                "c": "Receiving unwanted emails"
            },
            {
                "d": "All of the above"
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct! Physical safety hazards refer to any situation/condition that can cause bodily harm or injury. Tripping over an electric cord is an example of a physical safety hazard."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Privacy",
        "level": "beginner",
        "question": "What is the importance of social media privacy settings?",
        "answers": [
            {
                "a1": "To protect personal information and data from hackers."
            },
            {
                "a2": "To ensure no one can access your social media accounts."
            },
            {
                "a3": "To increase your social media followers."
            },
            {
                "a4": "To share personal information with everyone."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Social media privacy settings allow individuals to control who can see and access their personal information, protecting them from cyber attacks and identity theft."
            },
            {
                "a2": "Incorrect. Social media privacy settings do not necessarily prevent someone from accessing your accounts if they have your login information or are able to hack into your accounts."
            },
            {
                "a3": "Incorrect. Social media privacy settings are not necessarily related to increasing followers."
            },
            {
                "a4": "Incorrect. Sharing personal information with everyone is not recommended and can lead to privacy and security risks."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Cyber Fundamentals",
        "level": "beginner",
        "question": "Which of the following is an example of a cyber threat?",
        "answers": [
            {
                "a": "Receiving too many emails in your inbox"
            },
            {
                "b": "Your computer slowing down"
            },
            {
                "c": "Getting hacked by a cybercriminal"
            },
            {
                "d": "Installing new software"
            }
        ],
        "correct_answer": "c",
        "explanations": [
            {
                "a": "Incorrect. Receiving too many emails is not a cyber threat."
            },
            {
                "b": "Incorrect. Your computer may slow down due to factors like low storage space, but it is not necessarily a sign of a cyber threat."
            },
            {
                "c": "Correct. Cyber threats can take many forms, including hacking, phishing, malware, and more."
            },
            {
                "d": "Incorrect. Installing new software is not a cyber threat, but it could potentially introduce security vulnerabilities if not downloaded from a trusted source."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Penetration testing",
        "level": "intermediate",
        "question": "Which technique is used in social engineering to trick employees into disclosing sensitive information?",
        "answers": [
            "Tailgating",
            "Pharming",
            "DNS Spoofing",
            "Phishing"
        ],
        "correct_answer": "Phishing",
        "explanations": [
            {
                "Tailgating": "Incorrect. Tailgating is the act of following someone without their consent to access confidential information."
            },
            {
                "Pharming": "Incorrect. Pharming is an advanced form of DNS spoofing."
            },
            {
                "DNS Spoofing": "Incorrect. DNS Spoofing is the process of modifying a domain name system to divert traffic to the attacker’s system."
            },
            {
                "Phishing": "Correct. Phishing is a social engineering technique used to trick employees into disclosing sensitive information, such as usernames and passwords, by sending emails that appear to be from reputable sources."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Product risk profiles",
        "level": "beginner",
        "question": "What is the purpose of product risk profiles?",
        "answers": [
            {
                "a1": "To assess the potential risks and hazards associated with a particular product."
            },
            {
                "a2": "To market the product to potential customers."
            },
            {
                "a3": "To increase production efficiency."
            },
            {
                "a4": "To save money on manufacturing costs."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Product risk profiles are used to assess potential risks and hazards associated with a product, allowing companies to make informed decisions about design and safety measures."
            },
            {
                "a2": "Incorrect. Product risk profiles are not used for marketing purposes."
            },
            {
                "a3": "Incorrect. Product risk profiles are not used to increase production efficiency."
            },
            {
                "a4": "Incorrect. Product risk profiles are not used to save money on manufacturing costs."
            }
        ]
    },
    {
        "topic": "OWASP Top 10",
        "category": "Total Overview",
        "level": "beginner",
        "question": "Which of the following is NOT one of the OWASP Top 10 vulnerabilities?",
        "answers": [
            {
                "a1": "Injection Flaws"
            },
            {
                "a2": "Broken Authentication and Session Management"
            },
            {
                "a3": "Cross-Site Scripting"
            },
            {
                "a4": "Email Phishing"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Injection flaws are number one in the OWASP Top 10 list and refer to the ability of an attacker to send untrusted data to an interpreter as part of a command or query."
            },
            {
                "a2": "Incorrect. Broken authentication and session management refer to the failure of the system to properly authenticate the user or manage the sessions once the user is authenticated."
            },
            {
                "a3": "Incorrect. Cross-Site Scripting (XSS) is a type of injection attack where the attacker injects malicious content into a website viewed by other users, in order to steal data or run malicious code."
            },
            {
                "a4": "Correct. Email phishing is a common social engineering attack based on tricking the user to give away confidential information such as passwords or credit card numbers, but it is not part of the OWASP Top 10 list."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Source code management (SCM)",
        "level": "advanced",
        "question": "Which SCM tool is known for its \"pull request\" feature?",
        "answers": [
            {
                "a1": "Git"
            },
            {
                "a2": "Subversion"
            },
            {
                "a3": "Perforce"
            },
            {
                "a4": "Mercurial"
            }
        ],
        "correct_answer": [
            "a1"
        ],
        "explanations": [
            {
                "a1": "Correct. In Git, contributors can propose changes to the codebase by submitting a pull request to the original author."
            },
            {
                "a2": "Incorrect. Subversion uses the term \"merge request\" instead of \"pull request\"."
            },
            {
                "a3": "Incorrect. Perforce does not have a \"pull request\" feature."
            },
            {
                "a4": "Incorrect. Mercurial uses \"pull request\" terminology, but it is not as widely used as Git's."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Open-Source Intelligence (OSINT)",
        "level": "beginner",
        "question": "What is Open-Source Intelligence (OSINT)?",
        "answers": [
            {
                "a1": "The practice of gathering information from confidential sources."
            },
            {
                "a2": "The practice of gathering information from publicly available sources such as social media, news articles, and other online or offline platforms."
            },
            {
                "a3": "The practice of gathering information from only online platforms."
            },
            {
                "a4": "The practice of gathering information from government sources."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. OSINT is the practice of gathering information from publicly available sources, and not confidential sources."
            },
            {
                "a2": "Correct. OSINT refers to the practice of gathering information from publicly available sources such as social media, news articles, and other online or offline platforms."
            },
            {
                "a3": "Incorrect. OSINT involves gathering information from both online and offline sources, not just online platforms."
            },
            {
                "a4": "Incorrect. OSINT involves gathering information from publicly available sources, not just from the government."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Information Security",
        "level": "beginner",
        "question": "Which of the following is an example of personal identifying information (PII)?",
        "answers": [
            {
                "a1": "Home router"
            },
            {
                "a2": "Date of birth"
            },
            {
                "a3": "Firewall"
            },
            {
                "a4": "Email server"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. A home router is a device used to connect a local network to the Internet."
            },
            {
                "a2": "Correct. Personal identifying information (PII) includes sensitive data that can be used to identify individuals such as name, address, SSN, DOB, passport number, driver's license details, and financial information."
            },
            {
                "a3": "Incorrect. A firewall is a network security system designed to prevent unauthorized access to or from a private network."
            },
            {
                "a4": "Incorrect. An Email server enables sending and receiving email messages over a network."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Safety when Working from Home",
        "level": "intermediate",
        "question": "What should you do to ensure your home office meets fire safety standards?",
        "answers": [
            {
                "a1": "Assign a corner in your living room as your home office"
            },
            {
                "a2": "Store flammable materials near the electrical outlets"
            },
            {
                "a3": "Install smoke detectors and carbon monoxide alarms"
            },
            {
                "a4": "Do not use a fire extinguisher"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Simply assigning a corner in your living room as your home office does not ensure fire safety standards."
            },
            {
                "a2": "Incorrect. Storing flammable materials near the electrical outlets is dangerous and does not help maintain fire safety standards."
            },
            {
                "a3": "Correct. Installing smoke detectors and carbon monoxide alarms ensures that your home office meets fire safety standards."
            },
            {
                "a4": "Incorrect. Not using a fire extinguisher is dangerous and does not help maintain fire safety standards."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Secret scanning tools",
        "level": "beginner",
        "question": "What are secret scanning tools designed to do?",
        "answers": [
            {
                "a1": "Search for and identify sensitive information"
            },
            {
                "a2": "Encrypt data and protect it from hackers"
            },
            {
                "a3": "Block access to a website or network"
            },
            {
                "a4": "Monitor system performance"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct! Secret scanning tools are software programs designed to search for and identify sensitive information, such as passwords, credit card numbers, and other confidential data."
            },
            {
                "a2": "Incorrect. Secret scanning tools do not encrypt data, but they can help identify potential security risks to data."
            },
            {
                "a3": "Incorrect. Secret scanning tools do not block access to a website or network, but they can help identify potential security risks to a network."
            },
            {
                "a4": "Incorrect. Secret scanning tools do not monitor system performance, but they can help identify potential security risks to a system or network."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Credential Stuffing",
        "level": "beginner",
        "question": "What is credential stuffing?",
        "answers": [
            {
                "a": "A type of cyber attack where hackers use stolen usernames and passwords to gain unauthorized access to different accounts."
            },
            {
                "b": "A type of cyber attack where hackers use stolen credit card information to make unauthorized transactions."
            },
            {
                "c": "A type of cyber attack where hackers use malware to encrypt and steal sensitive data."
            },
            {
                "d": "A type of cyber attack where hackers use social engineering to trick users into giving away their login credentials."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Credential stuffing is a type of cyber attack where hackers use stolen usernames and passwords to gain unauthorized access to different accounts. This attack exploits users who reuse passwords across multiple accounts."
            },
            {
                "b": "Incorrect. This describes a different type of cyber attack, not credential stuffing."
            },
            {
                "c": "Incorrect. This describes a different type of cyber attack, not credential stuffing."
            },
            {
                "d": "Incorrect. This describes a different type of cyber attack, not credential stuffing."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Data governance and data privacy",
        "level": "expert",
        "question": "What is the difference between anonymization and pseudonymization of data?",
        "answers": [
            {
                "a1": "Anonymization means that no one can identify an individual from the data, while pseudonymization means that personal identifiers are replaced with artificial identifiers to protect privacy."
            },
            {
                "a2": "Anonymization and pseudonymization are the same thing."
            },
            {
                "a3": "Anonymization means that personal identifiers are replaced with artificial identifiers to protect privacy, while pseudonymization means that no one can identify an individual from the data."
            },
            {
                "a4": "None of the above"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Anonymization is the process of removing or destroying any identifying information that could link an individual to a dataset, so that the data is truly anonymized and cannot be linked to an individual. Pseudonymization, on the other hand, replaces personal identifiers with artificial identifiers to protect privacy, but the original data can still be linked to an individual if the artificial identifiers are re-identified."
            },
            {
                "a2": "Incorrect. This statement is completely false."
            },
            {
                "a3": "Incorrect. This statement confuses the concepts of anonymization and pseudonymization."
            },
            {
                "a4": "Incorrect. The correct answer is a) Anonymization means that no one can identify an individual from the data, while pseudonymization means that personal identifiers are replaced with artificial identifiers to protect privacy."
            }
        ]
    },
    {
        "topic": "OWASP Top 10",
        "category": "Total Overview",
        "level": "expert",
        "question": "Which of the following best describes Insufficient Logging and Monitoring?",
        "answers": [
            {
                "a1": "The use of unencrypted communication channels of confidential data, such as user credentials"
            },
            {
                "a2": "The failure to limit the impact of a vulnerability or attack, through proper isolation or compartmentalization"
            },
            {
                "a3": "The lack of proper testing or quality control to detect and prevent vulnerabilities in software or hardware"
            },
            {
                "a4": "The inability to detect or trace security events, such as unauthorized access or data leakage, in real-time"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. The use of unencrypted communication channels is part of A6-Security Misconfigurations."
            },
            {
                "a2": "Incorrect. Failure to limit impact is part of A3-Security Misconfigurations."
            },
            {
                "a3": "Incorrect. Lack of proper testing and quality control is part of A9-Using Components with Known Vulnerabilities."
            },
            {
                "a4": "Correct. Insufficient logging and monitoring refers to the inability to detect or trace security events, such as unauthorized or unexpected accesses or changes to the system or data, in real-time or near real-time. Without proper logging and monitoring, it is very difficult to detect and prevent attacks, and to respond or investigate compromised systems."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Secure Software Development Lifecycle",
        "level": "intermediate",
        "question": "Why is SSDL important?",
        "answers": [
            {
                "a1": "To identify security vulnerabilities in software development"
            },
            {
                "a2": "To evaluate software performance"
            },
            {
                "a3": "To improve software functionality"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct! One of the main objectives of SSDL is to identify security vulnerabilities in software development."
            },
            {
                "a2": "Incorrect. Improving software performance is not the main objective of SSDL."
            },
            {
                "a3": "Incorrect. Improving software functionality is not the main objective of SSDL."
            },
            {
                "a4": "Incorrect. SSDL is important for security purposes, not overall software development."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "PASTA",
        "level": "advanced",
        "question": "What is the purpose of the PASTA Risk Mitigation step?",
        "answers": [
            {
                "a1": "To eliminate all security risks identified during the Analysis phase"
            },
            {
                "a2": "To reduce the likelihood or impact of security risks identified during the Analysis phase"
            },
            {
                "a3": "To transfer the ownership of security risks to a third-party entity"
            },
            {
                "a4": "To accept all security risks identified during the Analysis phase"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. It is not always possible to eliminate all security risks, even after the Analysis phase. Risk mitigation involves reducing the likelihood or impact of identified risks."
            },
            {
                "a2": "Correct. The purpose of the PASTA Risk Mitigation step is to reduce the likelihood or impact of security risks identified during the Analysis phase."
            },
            {
                "a3": "Incorrect. The PASTA methodology does not involve transferring the ownership of security risks to a third-party entity as a risk management strategy."
            },
            {
                "a4": "Incorrect. Risk acceptance is a valid risk management strategy, but it should not be the only approach taken after the Analysis phase."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Staying Secure in your Workplace",
        "level": "advanced",
        "question": "What is the purpose of a firewall?",
        "answers": [
            {
                "a1": "To prevent unauthorized access to a network"
            },
            {
                "a2": "To scan incoming network traffic for viruses and malware"
            },
            {
                "a3": "To encrypt network traffic to protect against interception"
            },
            {
                "a4": "To monitor user activity on the network"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. Its primary purpose is to prevent unauthorized access to a network."
            },
            {
                "a2": "Incorrect. While some firewalls can perform this function, it is not their primary purpose."
            },
            {
                "a3": "Incorrect. Encryption is a separate security measure that is often used in conjunction with a firewall, but not as its primary purpose."
            },
            {
                "a4": "Incorrect. While some firewalls may have monitoring capabilities, this is not their primary purpose."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Open-Source Intelligence (OSINT)",
        "level": "intermediate",
        "question": "What is the purpose of OSINT?",
        "answers": [
            {
                "a1": "To gather information from confidential sources."
            },
            {
                "a2": "To gain insight into potential targets or adversaries and to improve offensive awareness."
            },
            {
                "a3": "To gather information from government sources."
            },
            {
                "a4": "To gather information only from online sources."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. OSINT involves gathering information from publicly available sources, not from confidential sources."
            },
            {
                "a2": "Correct. The main purpose of OSINT is to gain insight into potential targets or adversaries and to improve offensive awareness."
            },
            {
                "a3": "Incorrect. OSINT involves gathering information from publicly available sources, not just from the government."
            },
            {
                "a4": "Incorrect. OSINT involves gathering information from both online and offline sources, not just online sources."
            }
        ]
    },
    {
        "topic": "General",
        "category": "CEO Fraud",
        "level": "intermediate",
        "question": "What are some red flags of CEO fraud?",
        "answers": [
            {
                "a1": "The message is urgent and requests immediate action"
            },
            {
                "a2": "The sender's email address is different from the CEO's email"
            },
            {
                "a3": "The message requests confidential or sensitive information"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Urgency is a common tactic used in CEO fraud to pressure employees into making quick decisions without thinking."
            },
            {
                "a2": "Correct. Cybercriminals often use fake email addresses or domains that look similar to the CEO's to trick employees."
            },
            {
                "a3": "Correct. CEO fraud often involves cybercriminals trying to obtain confidential or sensitive information."
            },
            {
                "a4": "Correct. These are all common red flags of CEO fraud."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Session management",
        "level": "intermediate",
        "question": "What is the purpose of limiting session lifetimes?",
        "answers": [
            {
                "a1": "To force users to frequently re-authenticate"
            },
            {
                "a2": "To reduce the risk of session hijacking"
            },
            {
                "a3": "To prevent unauthorized access by expired sessions"
            },
            {
                "a4": "To reduce server load caused by idle sessions"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Limiting session lifetimes may not necessarily force users to frequently re-authenticate."
            },
            {
                "a2": "Correct. Limiting session lifetimes reduces the risk of session hijacking by limiting the period of time during which a session can be used to gain unauthorized access."
            },
            {
                "a3": "Incorrect. Limiting session lifetimes does not necessarily prevent unauthorized access by expired sessions, but it can help reduce the risk."
            },
            {
                "a4": "Incorrect. Limiting session lifetimes is not primarily done to reduce server load caused by idle sessions, but rather to improve security."
            }
        ]
    },
    {
        "topic": "General",
        "category": "CEO Fraud",
        "level": "advanced",
        "question": "What is the most effective way to prevent CEO fraud?",
        "answers": [
            {
                "a1": "Train employees to recognize suspicious emails and phone calls"
            },
            {
                "a2": "Implement strict authorization processes for financial transactions"
            },
            {
                "a3": "Perform regular vulnerability assessments to identify and address potential security weaknesses"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Regular training for employees is one of the most effective ways to prevent CEO fraud."
            },
            {
                "a2": "Correct. Implementing strict authorization processes helps prevent unauthorized financial transactions from occurring."
            },
            {
                "a3": "Correct. Regular vulnerability assessments help identify and address potential security weaknesses."
            },
            {
                "a4": "Correct. All three options are effective ways to prevent CEO fraud."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Static Application Security Testing (SAST)",
        "level": "advanced",
        "question": "What is code coverage analysis and why is it important in SAST?",
        "answers": [
            {
                "a1": "Code coverage analysis measures the amount of code that has been tested and is important for identifying untested, potentially risky code."
            },
            {
                "a2": "Code coverage analysis measures the number of vulnerabilities present in the code and is important for determining how secure the application is."
            },
            {
                "a3": "Code coverage analysis measures the effectiveness of SAST tools and is important for selecting the right tool for a project."
            },
            {
                "a4": "Code coverage analysis measures the speed of code execution and is important for optimizing application performance."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Code coverage analysis is used to measure the amount of code that has been tested and identify untested code that may contain potential security risks."
            },
            {
                "a2": "Incorrect. Code coverage analysis does not measure the number of vulnerabilities present in code, but instead evaluates the extent to which code has been tested."
            },
            {
                "a3": "Incorrect. Code coverage analysis does not measure the effectiveness of SAST tools but instead evaluates the test coverage of code."
            },
            {
                "a4": "Incorrect. Code coverage analysis does not measure the speed of code execution, but instead evaluates the extent to which code has been tested."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Cryptographic Architecture",
        "level": "beginner",
        "question": "What is Cryptographic Architecture?",
        "answers": [
            {
                "a": "A framework used to design and implement secure communication systems."
            },
            {
                "b": "An application that encrypts files."
            },
            {
                "c": "A type of firewall."
            },
            {
                "d": "An algorithm used to crack passwords."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Cryptographic Architecture refers to the framework used to design and implement secure communication systems."
            },
            {
                "b": "Incorrect. This is not the definition of Cryptographic Architecture."
            },
            {
                "c": "Incorrect. This is not the definition of Cryptographic Architecture."
            },
            {
                "d": "Incorrect. This is not the definition of Cryptographic Architecture."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Complete Mediation",
        "level": "expert",
        "question": "In a building that employs Complete Mediation, how does the focal point of the design connect with the rest of the elements?",
        "answers": [
            {
                "a1": "The focal point is completely separate from the rest of the elements."
            },
            {
                "a2": "The focal point is the sole element that connects the other elements."
            },
            {
                "a3": "The focal point is one of many elements that work together to create a harmonious design."
            },
            {
                "a4": "The focal point is only connected to some of the other elements, creating a balance of design."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. The point of Complete Mediation is to link all of the elements in a design, so the focal point must have some connection to the rest of the design."
            },
            {
                "a2": "Incorrect. Although the focal point is essential in directing all aspects of the design, it is not the only thing that connects the other elements."
            },
            {
                "a3": "Correct. The focal point in Complete Mediation is one part of a larger connection between all of the elements, working together to create a harmonious and cohesive structure."
            },
            {
                "a4": "Incorrect. In Complete Mediation, all elements must be connected, including the focal point."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Dynamic application security testing (DAST)",
        "level": "advanced",
        "question": "Which of the following is a common approach used by DAST tools to simulate attacks?",
        "answers": [
            {
                "a1": "DAST tools use pattern matching to identify vulnerabilities in the application code"
            },
            {
                "a2": "DAST tools use machine learning algorithms to test the application"
            },
            {
                "a3": "DAST tools inject malicious input into the application to trigger vulnerabilities"
            },
            {
                "a4": "DAST tools use static analysis to identify vulnerabilities in the application code"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. DAST tools typically use more sophisticated techniques than pattern matching to identify vulnerabilities."
            },
            {
                "a2": "Incorrect. While machine learning algorithms can be used in security testing, this is not a common approach for DAST tools."
            },
            {
                "a3": "Correct. DAST tools commonly inject malicious input into the application to simulate attacks and identify vulnerabilities."
            },
            {
                "a4": "Incorrect. Static analysis is not typically used by DAST tools, which are designed to simulate real-world attacks."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Source code management (SCM)",
        "level": "beginner",
        "question": "What is SCM used for in software development?",
        "answers": [
            {
                "a1": "Track code changes"
            },
            {
                "a2": "Collaborate on coding projects"
            },
            {
                "a3": "Maintain a history of code changes"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": [
            "a4"
        ],
        "explanations": [
            {
                "a1": "Correct. SCM allows developers to track code changes."
            },
            {
                "a2": "Correct. SCM allows developers to collaborate on coding projects."
            },
            {
                "a3": "Correct. SCM helps maintain a history of code changes."
            },
            {
                "a4": "Correct. SCM allows developers to do all the mentioned tasks."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Interactive Application Security Testing (IAST)",
        "level": "intermediate",
        "question": "How does IAST differ from SAST and DAST?",
        "answers": [
            {
                "a": "IAST detects vulnerabilities during the runtime of the application, while SAST examines the application's source code, and DAST examines the application in its running state."
            },
            {
                "b": "IAST examines the application in its running state, while SAST detects vulnerabilities during the runtime of the application, and DAST examines the application's source code."
            },
            {
                "c": "IAST examines the application's source code, while SAST examines the application in its running state, and DAST detects vulnerabilities during the runtime of the application."
            },
            {
                "d": "IAST, SAST and DAST are all the same and detect vulnerabilities during the runtime of the application."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct! IAST examines the application in its running state and combines the benefits of both SAST and DAST, which examines the application's source code and running state, respectively."
            },
            {
                "b": "Incorrect. This is the opposite of what IAST does. SAST examines the application's source code, and DAST examines the application in its running state."
            },
            {
                "c": "Incorrect. This is partially true for SAST and DAST. IAST examines the application in its running state, not source code."
            },
            {
                "d": "Incorrect. IAST, SAST and DAST are different and use different techniques to detect vulnerabilities."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "CI-CD tools",
        "level": "advanced",
        "question": "What is the difference between Continuous Integration and Continuous Delivery?",
        "answers": [
            {
                "a1": "Continuous Integration is the automatic building and testing of code when changes are made, while Continuous Delivery is the automatic deployment of code changes to the production environment."
            },
            {
                "a2": "Continuous Integration is the continuous deployment of code changes, while Continuous Delivery is the continuous testing of code changes."
            },
            {
                "a3": "Continuous Integration is the automatic building and testing of code when changes are made, while Continuous Delivery includes both automatic testing and deployment of changes."
            },
            {
                "a4": "Continuous Integration and Continuous Delivery are the same thing, just different terms used by different tools."
            }
        ],
        "correct_answer": [
            "a3"
        ],
        "explanations": [
            {
                "a1": "Close, but not quite. Continuous Delivery does include the automatic deployment of code changes, but it's not exclusively the only thing it encompasses."
            },
            {
                "a2": "Incorrect. Continuous Integration is specifically focused on building and testing code, not deployment."
            },
            {
                "a3": "Correct! Continuous Integration and Continuous Delivery both involve the automatic building and testing of code, but Continuous Delivery also includes automatic deployment of changes."
            },
            {
                "a4": "This is not true. While different tools may use different terminology or have slightly different approaches to CI/CD, the basic concepts are consistent."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Access Control Architecture",
        "level": "beginner",
        "question": "What is Access Control Architecture?",
        "answers": [
            {
                "a": "A set of policies, procedures, and techniques that regulate and manage access to critical data and resources."
            },
            {
                "b": "Architecture that controls the access to the building."
            },
            {
                "c": "A software that controls access to the internet."
            },
            {
                "d": "None of the above."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Access Control Architecture refers to a set of policies, procedures, and techniques that regulate and manage access to critical data and resources. It incorporates technologies like authentication, authorization, security tokens, and user roles, ensuring that only authorized entities can access sensitive information or locations."
            },
            {
                "b": "Incorrect. This option refers to building access control systems."
            },
            {
                "c": "Incorrect. This option refers to internet control software."
            },
            {
                "d": "Incorrect. The correct option is a."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Communications Architecture",
        "level": "beginner",
        "question": "What is communications architecture?",
        "answers": [
            {
                "a1": "The design and organization of communication systems, technologies, and protocols within a larger network or organization."
            },
            {
                "a2": "A method of encrypting messages to ensure security."
            },
            {
                "a3": "The process of sending data from one device to another."
            },
            {
                "a4": "The use of wireless technology to transmit information."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Communications architecture refers to the design and organization of communication systems, technologies, and protocols within a larger network or organization. It ensures effective communication and collaboration between different parts of an organization, enabling productivity and innovation."
            },
            {
                "a2": "Incorrect. This answer describes encryption methods, which are a part of communications architecture but not its full definition."
            },
            {
                "a3": "Incorrect. This answer describes data transmission, which is one consideration within communications architecture, but not its full definition."
            },
            {
                "a4": "Incorrect. This answer describes wireless technology, which is one technology used within communications architecture, but not its full definition."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Least privilege",
        "level": "expert",
        "question": "What is the difference between role-based access control (RBAC) and attribute-based access control (ABAC)?",
        "answers": [
            {
                "a1": "RBAC is more flexible than ABAC, as it allows roles to be assigned based on individual users, while ABAC only allows roles to be assigned based on attributes."
            },
            {
                "a2": "ABAC is more flexible than RBAC, as it allows access to be granted based on individual attributes rather than pre-defined roles."
            },
            {
                "a3": "Both RBAC and ABAC are similar in that they allow access to be granted based on predefined policies, but RBAC is more common in larger organizations while ABAC is more common in smaller organizations."
            },
            {
                "a4": "RBAC and ABAC are interchangeable concepts and are both used to refer to the same cybersecurity practice."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. While RBAC is a flexible approach that allows roles to be assigned to individual users based on their responsibilities, this is not a feature of ABAC. ABAC, on the other hand, allows access to be granted based on individual attributes such as job function, location, or time of day."
            },
            {
                "a2": "Correct. The main difference between RBAC and ABAC is that RBAC is role-based, while ABAC is attribute-based. This means that RBAC grants access to users based on predefined roles that match their job functions or responsibilities, while ABAC grants access based on individual attributes such as department, job function, or clearance level. ABAC is more flexible than RBAC because it allows access to be granted based on multiple attributes rather than pre-defined roles."
            },
            {
                "a3": "Incorrect. There is no correlation between the size of an organization and the access control approach it employs. Both RBAC and ABAC are used in organizations of all sizes, depending on the specific needs and requirements of the system or environment."
            },
            {
                "a4": "Incorrect. While RBAC and ABAC are both access control concepts, they are not interchangeable terms as they refer to different approaches. RBAC grants access based on predefined roles, while ABAC grants access based on individual attributes."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Secure File Upload Architecture",
        "level": "beginner",
        "question": "Which of the following measures does Secure File Upload Architecture use to protect against unauthorized access and data breaches?",
        "answers": [
            {
                "a1": "Encryption"
            },
            {
                "a2": "Authentication"
            },
            {
                "a3": "Authorization"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Encryption is used in Secure File Upload Architecture to protect sensitive information."
            },
            {
                "a2": "Correct. Authentication measures are used to ensure that only authorized users can access the files being uploaded."
            },
            {
                "a3": "Correct. Authorization measures are employed to ensure that the uploaded files are only accessible by authorized personnel."
            },
            {
                "a4": "Correct. All three measures (encryption, authentication, and authorization) are used in Secure File Upload Architecture to ensure the safe and secure transfer of files from clients to servers."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "API Architecture",
        "level": "intermediate",
        "question": "What is the purpose of API Gateway Service?",
        "answers": [
            {
                "a1": "To provide secure external access to microservices."
            },
            {
                "a2": "To manage and orchestrate microservice API calls."
            },
            {
                "a3": "To organize and manage REST API requests."
            },
            {
                "a4": "To enable communication between microservices and clients."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct! API Gateway provides secure, external access to microservices."
            },
            {
                "a2": "Incorrect. API Gateway is responsible for managing and orchestrating microservice API calls between different services."
            },
            {
                "a3": "Incorrect. API Gateway is more focused on managing the calls between different services rather than on receiving REST API requests."
            },
            {
                "a4": "Incorrect. API Gateway is more involved in managing the calls between different services rather than on ensuring communication between microservices and clients."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Input and Output Architecture",
        "level": "expert",
        "question": "What are some factors to consider when designing input/output architecture for a high-performance computing system?",
        "answers": [
            {
                "a1": "The type and amount of data being transferred"
            },
            {
                "a2": "The speed and bandwidth of the communication channels between devices"
            },
            {
                "a3": "The reliability and fault tolerance of the system"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. The type and amount of data being transferred is an important factor to consider in input/output architecture design."
            },
            {
                "a2": "Partially correct. The speed and bandwidth of communication channels can greatly affect the performance of a high-performance computing system."
            },
            {
                "a3": "Partially correct. The reliability and fault tolerance of the system are important considerations for high-performance computing, especially in mission-critical applications."
            },
            {
                "a4": "Correct. All of the listed factors must be considered in the design of input/output architecture for a high-performance computing system."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Remote Work Security",
        "level": "intermediate",
        "question": "What is the purpose of a virtual private network (VPN) in remote work security?",
        "answers": [
            {
                "a1": "To provide extra security when accessing public wifi networks"
            },
            {
                "a2": "To secure internet traffic to and from the user's device"
            },
            {
                "a3": "To scan for and block malware"
            },
            {
                "a4": "To encrypt files stored on the cloud"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Partially correct. A VPN can indeed provide extra security when accessing public wifi networks, but it has other uses as well."
            },
            {
                "a2": "Correct. A VPN creates a secure, encrypted tunnel for internet traffic, which helps protect against eavesdropping and other cyber attacks."
            },
            {
                "a3": "Incorrect. Scanning for and blocking malware is the responsibility of antivirus tools, not VPNs."
            },
            {
                "a4": "Incorrect. Encrypting files stored on the cloud is important, but it is not the purpose of a VPN."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Penetration testing",
        "level": "advanced",
        "question": "Which vulnerability scanning tool allows for customization of vulnerability testing and can be used with multiple operating systems?",
        "answers": [
            "OpenVAS",
            "Nessus",
            "Wireshark",
            "Kali Linux"
        ],
        "correct_answer": "Nessus",
        "explanations": [
            {
                "OpenVAS": "Incorrect. OpenVAS is a free and open-source tool used for vulnerability scanning."
            },
            {
                "Nessus": "Correct. Nessus is a popular scanning tool used for vulnerability testing and can be customized to scan multiple operating systems."
            },
            {
                "Wireshark": "Incorrect. Wireshark is a tool used for network analysis."
            },
            {
                "Kali Linux": "Incorrect. Kali Linux is a penetration testing operating system used to perform security testing."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Open-Source Intelligence (OSINT)",
        "level": "expert",
        "question": "What are some legal and ethical considerations when using OSINT?",
        "answers": [
            {
                "a1": "Respect for privacy and human rights."
            },
            {
                "a2": "Compliance with local laws and regulations."
            },
            {
                "a3": "Avoiding the use of falsified or manipulated information."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Respect for privacy and human rights is an important legal and ethical consideration when using OSINT."
            },
            {
                "a2": "Correct. Compliance with local laws and regulations is another important legal and ethical consideration when using OSINT."
            },
            {
                "a3": "Correct. Avoiding the use of falsified or manipulated information is another important legal and ethical consideration when using OSINT."
            },
            {
                "a4": "Correct. All of the above are legal and ethical considerations when using OSINT."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Encryption in transit and at rest",
        "level": "intermediate",
        "question": "What is the main difference between SSL/TLS and a VPN?",
        "answers": [
            {
                "a1": "SSL/TLS is used to encrypt web traffic, while a VPN is used to connect networks securely."
            },
            {
                "a2": "SSL/TLS is used to authenticate users, while a VPN is used to encrypt data."
            },
            {
                "a3": "SSL/TLS is a hardware-based security solution, while a VPN is a software-based solution."
            },
            {
                "a4": "SSL/TLS and VPN are essentially the same thing."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct! SSL/TLS encrypts web traffic, while a VPN creates a secure, encrypted tunnel between two networks."
            },
            {
                "a2": "Incorrect. While both SSL/TLS and VPN provide encryption, they have different use cases."
            },
            {
                "a3": "Incorrect. SSL/TLS and VPN are both software-based solutions."
            },
            {
                "a4": "Incorrect. SSL/TLS and VPN serve different purposes."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Malicious Software Architecture",
        "level": "intermediate",
        "question": "What type of malicious software is designed to encrypt a victim's files and demand payment in exchange for the decryption key?",
        "answers": [
            {
                "a1": "Worm"
            },
            {
                "a2": "Trojan horse"
            },
            {
                "a3": "Virus"
            },
            {
                "a4": "Ransomware"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Worms replicate themselves to spread throughout a network or system, but do not generally involve encryption or demanding payment for decryption."
            },
            {
                "a2": "Incorrect. Trojan horse programs can give attackers unauthorized access to a system, but do not generally involve encryption or demanding payment for decryption."
            },
            {
                "a3": "Incorrect. Viruses infect other files to spread themselves, but do not generally involve encryption or demanding payment for decryption."
            },
            {
                "a4": "Correct. Ransomware is a type of malicious software that encrypts a victim's files and demands payment in exchange for the decryption key."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Disaster Recovery",
        "level": "beginner",
        "question": "What is disaster recovery?",
        "answers": [
            {
                "a1": "A plan that focuses on minimizing downtime, protecting data integrity, and ensuring business continuity during unforeseen events."
            },
            {
                "a2": "A plan that helps your company to increase revenue and reduce stress on employees."
            },
            {
                "a3": "A plan that involves developing new products or services to meet the competition."
            },
            {
                "a4": "A plan that focuses exclusively on natural disasters."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Disaster recovery is a plan focused on preparing and responding to unforeseen events that could impact business operations. It aims to minimize downtime, protect data integrity, and ensure business continuity during unforeseen events, while also safeguarding customer and stakeholder interests. Developing risk management plans and backup strategies are a part of disaster recovery."
            },
            {
                "a2": "Incorrect. This definition is incorrect as disaster recovery aims to minimize downtime, protect data integrity, and ensure business continuity during unforeseen events."
            },
            {
                "a3": "Incorrect. This definition is incorrect as disaster recovery does not involve developing new products or services to meet competition."
            },
            {
                "a4": "Incorrect. This definition is incorrect as disaster recovery focuses not only on natural disasters but also on cyber attacks and human errors."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Product risk profiles",
        "level": "expert",
        "question": "How can product risk profiles be used to inform regulatory compliance?",
        "answers": [
            {
                "a1": "By identifying and assessing risks that may violate regulations."
            },
            {
                "a2": "By developing strategies to minimize the identified risks."
            },
            {
                "a3": "By conducting regular assessments and revisions to ensure ongoing compliance."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. Identifying and assessing risks that may violate regulations is one way that product risk profiles can be used to inform regulatory compliance."
            },
            {
                "a2": "Partially correct. Developing strategies to minimize the identified risks is another way that product risk profiles can be used to inform regulatory compliance."
            },
            {
                "a3": "Partially correct. Conducting regular assessments and revisions to ensure ongoing compliance is another way that product risk profiles can be used to inform regulatory compliance."
            },
            {
                "a4": "Correct. All of these ways can be used to inform regulatory compliance."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Malicious Software Architecture",
        "level": "expert",
        "question": "What is a \"dropper\" in the context of malware?",
        "answers": [
            {
                "a1": "A type of malware that opens a backdoor into a system for attackers to exploit"
            },
            {
                "a2": "A technique used by malware to evade detection by security software"
            },
            {
                "a3": "A standalone program that installs other malware onto a system"
            },
            {
                "a4": "A form of ransomware that encrypts the entire hard drive instead of individual files"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. The backdoor refers to a vulnerability in a system that attackers can use to gain unauthorized access, but not to the dropper itself."
            },
            {
                "a2": "Incorrect. Malware can use a variety of techniques to evade detection, but droppers specifically refer to a type of program that installs other malware onto a system."
            },
            {
                "a3": "Correct. A dropper is a standalone program that installs other malware onto a system. It can be designed to be undetectable by security programs, making it especially dangerous."
            },
            {
                "a4": "Incorrect. Full disk encryption is a technique used by some malware to make the target machine inaccessible, but it is not specific to ransomware."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Impersonation Fraud",
        "level": "advanced",
        "question": "What is the key factor in preventing victimization by impersonation fraud?",
        "answers": [
            {
                "a1": "Regularly changing your passwords and PINs"
            },
            {
                "a2": "Providing all requested information when asked by authorities"
            },
            {
                "a3": "Verifying the legitimacy of any requests before providing information or funds"
            },
            {
                "a4": "Avoiding all online transactions"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Changing passwords and PINs regularly is important, but it is not the key factor in preventing impersonation fraud."
            },
            {
                "a2": "Incorrect. Providing all requested information can actually make you more vulnerable to impersonation fraud."
            },
            {
                "a3": "Correct. Verifying the legitimacy of requests is key to preventing impersonation fraud. Always double check the identity of the person or entity making the request before providing any information or funds."
            },
            {
                "a4": "Incorrect. Avoiding online transactions altogether is not always possible or practical, and does not necessarily prevent impersonation fraud."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Defense in depth",
        "level": "advanced",
        "question": "What is the difference between an active and a passive layer in a Defense in Depth approach?",
        "answers": [
            {
                "a": "An active layer is proactive and can detect and respond to an attack in real-time, while a passive layer is only reactive."
            },
            {
                "b": "A passive layer is more effective than an active layer because it doesn't rely on any human intervention."
            },
            {
                "c": "An active layer is only effective against known attacks, while a passive layer can protect against unknown attacks."
            },
            {
                "d": "A passive layer is more expensive than an active layer because it requires more hardware."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Active layers, such as intrusion prevention systems (IPS) and security information and event management (SIEM), can detect and respond to an attack in real-time, while passive layers, such as firewalls and access control, are only reactive."
            },
            {
                "b": "Incorrect. A passive layer still requires some human intervention and can be less effective against certain types of attacks."
            },
            {
                "c": "Incorrect. An active layer can also protect against unknown attacks with the help of machine learning and artificial intelligence."
            },
            {
                "d": "Incorrect. The cost of a layer depends on multiple factors and is not determined by whether it is active or passive."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Disaster Recovery",
        "level": "advanced",
        "question": "What are the three key components of a disaster recovery plan?",
        "answers": [
            {
                "a1": "Risk assessment, backup strategies, and incident response."
            },
            {
                "a2": "Business continuity, resource allocation, and employee training."
            },
            {
                "a3": "Supply chain management, financial planning, and customer support."
            },
            {
                "a4": "Strategic planning, project management, and market analysis."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. The three key components of a disaster recovery plan are risk assessment, backup strategies, and incident response. Conducting a risk assessment is crucial to identify potential threats and vulnerabilities. Developing backup strategies ensure that data and essential systems are backed up in case of a disaster. Incident response outlines the steps to take after an incident to restore operations."
            },
            {
                "a2": "Incorrect. These components are important in overall business management but are not specific to disaster recovery."
            },
            {
                "a3": "Incorrect. While supply chain management, financial planning, and customer support are important components of business continuity, they are not specific to disaster recovery."
            },
            {
                "a4": "Incorrect. Strategic planning, project management, and market analysis are important components in managing a business but are not specific to disaster recovery."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Architecture assessment",
        "level": "advanced",
        "question": "Which perspective of architecture assessment focuses on the ability of the software to adapt to change?",
        "answers": [
            {
                "a1": "Functionality"
            },
            {
                "a2": "Performance"
            },
            {
                "a3": "Maintainability"
            },
            {
                "a4": "Sustainability"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Functionality perspective focuses on the ability of the system to meet the functional requirements."
            },
            {
                "a2": "Performance perspective focuses on the system's responsiveness and speed."
            },
            {
                "a3": "Correct. Maintainability perspective focuses on the software's ability to adapt to changes in the future without affecting its functionality, quality or design."
            },
            {
                "a4": "Sustainability perspective focuses on the impact of the system on the environment and society."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Email Safety",
        "level": "beginner",
        "question": "Which of the following is an example of an email-based threat?",
        "answers": [
            {
                "a1": "Pop-up ads"
            },
            {
                "a2": "Junk mail"
            },
            {
                "a3": "Phishing scams"
            },
            {
                "a4": "Phone scams"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Pop-up ads are not email-based threats."
            },
            {
                "a2": "Incorrect. Junk mail is a type of email, not a threat."
            },
            {
                "a3": "Correct. Phishing scams are a common email-based threat and refer to the practice of sending fraudulent emails to trick individuals into revealing personal information or clicking on malicious links."
            },
            {
                "a4": "Incorrect. Phone scams are not email-based threats."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Software composition analysis (SCA)",
        "level": "advanced",
        "question": "What are the benefits of using SCA in software development?",
        "answers": [
            {
                "a1": "It helps developers understand the impact of open-source components."
            },
            {
                "a2": "It detects potential security vulnerabilities in third-party components."
            },
            {
                "a3": "It ensures compliance with software licenses."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. One of the benefits of SCA is that it helps developers understand the impact of open-source components."
            },
            {
                "a2": "Partially correct. One of the benefits of SCA is that it detects potential security vulnerabilities in third-party components."
            },
            {
                "a3": "Partially correct. One of the benefits of SCA is that it ensures compliance with software licenses."
            },
            {
                "a4": "Correct. All of the above are benefits of using SCA in software development."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Data Protection and Privacy Architecture",
        "level": "intermediate",
        "question": "What is the main difference between data privacy and data protection?",
        "answers": [
            {
                "a": "Data privacy refers to how data is collected, used, and shared, while data protection relates to the measures used to safeguard data from unauthorized access or theft."
            },
            {
                "b": "Data privacy relates only to sensitive data, while data protection focuses on all data types."
            },
            {
                "c": "Data protection is a subset of data privacy."
            },
            {
                "d": "Both terms refer to different protective measures to safeguard data from being misused."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Data privacy refers to the rights of an individual to control their personal data and how it is used, while data protection focuses on the measures used to safeguard data from unauthorized access or theft."
            },
            {
                "b": "Incorrect. Data privacy is relevant to all data collected, used, and shared by an organization, not just sensitive data."
            },
            {
                "c": "Incorrect. Data privacy has a broader meaning, while data protection is a component of data privacy."
            },
            {
                "d": "Incorrect. While both terms relate to protecting data, data privacy and data protection have different specific meanings, as explained above."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Encryption in transit and at rest",
        "level": "expert",
        "question": "What is a side-channel attack in the context of encryption?",
        "answers": [
            {
                "a1": "An attack that exploits weaknesses in the encryption algorithm itself."
            },
            {
                "a2": "An attack that exploits weaknesses in the encryption key."
            },
            {
                "a3": "An attack that exploits information leaked by the system performing the encryption."
            },
            {
                "a4": "An attack that exploits vulnerabilities in the network between the sender and receiver."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. This refers to a cryptographic attack."
            },
            {
                "a2": "Incorrect. This refers to a key-based attack."
            },
            {
                "a3": "Correct! Side-channel attacks exploit information leaked by the system performing the encryption, such as the power consumption or electromagnetic radiation emitted during encryption."
            },
            {
                "a4": "Incorrect. This refers to a network-based attack."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Impersonation Fraud",
        "level": "beginner",
        "question": "What is impersonation fraud?",
        "answers": [
            {
                "a1": "A type of fraud where a perpetrator pretends to be someone else"
            },
            {
                "a2": "A type of fraud where a perpetrator hacks into a system to steal information"
            },
            {
                "a3": "A type of fraud where a perpetrator uses physical force to steal from victims"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Impersonation fraud involves a perpetrator pretending to be a legitimate business or government entity to steal personal information or money from victims."
            },
            {
                "a2": "Incorrect. Impersonation fraud does not involve hacking into a system."
            },
            {
                "a3": "Incorrect. Impersonation fraud does not involve physical force."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "applied to application",
        "level": "beginner",
        "question": "What is the purpose of Threat Modeling?",
        "answers": [
            {
                "a1": "To identify and mitigate potential security risks in software applications."
            },
            {
                "a2": "To find and fix bugs in software applications."
            },
            {
                "a3": "To improve the performance of software applications."
            },
            {
                "a4": "To test the compatibility of software applications with different platforms."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Threat modeling is the process of identifying and mitigating potential security risks in software applications."
            },
            {
                "a2": "Incorrect. Finding and fixing bugs is part of software testing, but it is not the main purpose of threat modeling."
            },
            {
                "a3": "Incorrect. Improving performance is important for software applications, but it is not the main purpose of threat modeling."
            },
            {
                "a4": "Incorrect. Testing compatibility with different platforms is important, but it is not the main purpose of threat modeling."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Complete Mediation",
        "level": "beginner",
        "question": "What is the goal of Complete Mediation in architecture?",
        "answers": [
            {
                "a1": "To create a natural flow of movement throughout the space."
            },
            {
                "a2": "To make the focal point of the design stand out."
            },
            {
                "a3": "To connect all the people within a space."
            },
            {
                "a4": "To create a sense of confusion throughout the space."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Complete mediation creates an intuitive and natural flow of movement throughout the space. Allowing for an easy sense of direction through the design."
            },
            {
                "a2": "Incorrect. Although the focal point of a design is important, the goal of Complete Mediation is to link together all the elements, creating a harmonious structure."
            },
            {
                "a3": "Incorrect. The social aspect of a space is not a direct goal of Complete Mediation."
            },
            {
                "a4": "Incorrect. Confusion is not a desirable quality of any space."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Sharing Data and Documents Securely",
        "level": "intermediate",
        "question": "Which of the following is an example of two-factor authentication that can be used to secure access to shared sensitive data?",
        "answers": [
            {
                "a": "Username and password"
            },
            {
                "b": "Fingerprint scanner and password"
            },
            {
                "c": "Email and password"
            },
            {
                "d": "Security Question and password"
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Username and password is not two-factor authentication, as it only requires one form of identification."
            },
            {
                "b": "Correct. Fingerprint scanner and password is an example of two-factor authentication, as it requires both something the user is (the fingerprint) and something the user knows (the password)."
            },
            {
                "c": "Incorrect. Email and password is not two-factor authentication, as both forms of identification are something the user knows."
            },
            {
                "d": "Incorrect. Security Question and password is not two-factor authentication, as both forms of identification are something the user knows."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Secure File Upload Architecture",
        "level": "expert",
        "question": "Can Secure File Upload Architecture provide end-to-end encryption?",
        "answers": [
            {
                "a1": "Yes, if the client encrypts the file using a public key provided by the server"
            },
            {
                "a2": "Yes, if the server decrypts the file using a private key provided by the client"
            },
            {
                "a3": "No, because the server needs to be able to read and process the file"
            },
            {
                "a4": "No, because end-to-end encryption is not possible in a client-server architecture"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. If the client encrypts the file using a public key provided by the server, it means that the server can also decrypt the file, so this is not true end-to-end encryption."
            },
            {
                "a2": "Incorrect. If the server decrypts the file using a private key provided by the client, it means that the client has to trust the server with their private key, which defeats the purpose of end-to-end encryption."
            },
            {
                "a3": "Correct. Secure File Upload Architecture cannot provide true end-to-end encryption, because the server needs to be able to read and process the file, which means that it has access to the unencrypted data while it is in transit."
            },
            {
                "a4": "Incorrect. While it is true that end-to-end encryption is more difficult to achieve in a client-server architecture, it is not impossible with the proper implementation of technologies such as TLS and HTTPS. However, it is still not possible to achieve true end-to-end encryption in Secure File Upload Architecture because of the need for the server to access the unencrypted data."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Avoiding Ransomware",
        "level": "beginner",
        "question": "What is one way to avoid falling victim to a ransomware attack?",
        "answers": [
            {
                "a1": "Use weak passwords"
            },
            {
                "a2": "Back up data regularly"
            },
            {
                "a3": "Click on suspicious links"
            },
            {
                "a4": "Disable antivirus software"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Weak passwords make it easier for cybercriminals to gain access to a system and install malware."
            },
            {
                "a2": "Correct. Regularly backing up data ensures that even if ransomware infects a system, the data can be recovered without having to pay a ransom."
            },
            {
                "a3": "Incorrect. Clicking on suspicious links can lead to malware installation and increase the risk of falling victim to a cyber attack."
            },
            {
                "a4": "Incorrect. Disabling antivirus software can leave a system vulnerable to malware infections, including ransomware."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Fail secure - Fail safe",
        "level": "advanced",
        "question": "How can a security architect determine which approach (fail secure or fail safe) to use in a particular security system?",
        "answers": [
            {
                "a1": "By assessing the risks associated with the system and evaluating the benefits and drawbacks of each approach"
            },
            {
                "a2": "By following industry standards and regulations"
            },
            {
                "a3": "Through trial and error"
            },
            {
                "a4": "By using a random selection process"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. A security architect must evaluate the risks, design goals, and circumstances surrounding the system to choose the appropriate approach to use."
            },
            {
                "a2": "Incorrect. Following industry standards and regulations may be necessary, but it does not provide a method for choosing between fail secure and fail safe."
            },
            {
                "a3": "Incorrect. Trial and error is not a viable method for determining which approach to use in a security system."
            },
            {
                "a4": "Incorrect. Random selection does not consider the unique needs and challenges of a specific security system."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Risk, threats, and vulnerabilities",
        "level": "intermediate",
        "question": "What is the difference between a vulnerability and a threat?",
        "answers": [
            {
                "a1": "A vulnerability is a weakness or gap in security, while a threat is an outside force that could potentially exploit the vulnerability."
            },
            {
                "a2": "A vulnerability is an outside force that could potentially exploit a weakness or gap in security, while a threat is a possible risk or danger."
            },
            {
                "a3": "A vulnerability and a threat are the same thing."
            },
            {
                "a4": "A vulnerability is a physical danger, while a threat is a digital danger."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. A vulnerability refers to a weakness or gap in security that could potentially be exploited, while a threat is an outside force or actor that has the potential to do harm. In other words, a vulnerability is a weakness in the system, while a threat is the potential exploit of that weakness."
            },
            {
                "a2": "Incorrect. A vulnerability is not an outside force, but rather a weakness or gap in security."
            },
            {
                "a3": "Incorrect. A vulnerability and a threat are distinct concepts."
            },
            {
                "a4": "Incorrect. A vulnerability can refer to either a physical or digital weakness, while a threat is a potential danger, regardless of the source."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Input and Output Architecture",
        "level": "intermediate",
        "question": "What is the purpose of input/output architecture in computer systems?",
        "answers": [
            {
                "a1": "To make it easier to add new peripherals to a computer system"
            },
            {
                "a2": "To allow for efficient data transfer and processing across different devices"
            },
            {
                "a3": "To ensure that all peripherals are compatible with the computer system"
            },
            {
                "a4": "To make it easier to upgrade a computer system's internal components"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. This is a benefit of input/output architecture, but not its primary purpose."
            },
            {
                "a2": "Correct. The purpose of input/output architecture is to enable efficient data transfer and processing across different devices."
            },
            {
                "a3": "Incorrect. Compatibility is one aspect of input/output architecture, but not its main purpose."
            },
            {
                "a4": "Incorrect. Upgrading internal components is not the main purpose of input/output architecture."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Smishing",
        "level": "expert",
        "question": "What are some advanced techniques that attackers use in smishing attacks?",
        "answers": [
            {
                "a1": "Combining smishing attacks with social engineering to manipulate victims and gain access to sensitive information."
            },
            {
                "a2": "Using AI-generated text messages that are difficult to distinguish from legitimate messages."
            },
            {
                "a3": "Converting text messages into voice messages to make them appear more legitimate."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. This is a common advanced technique in smishing attacks."
            },
            {
                "a2": "Correct. AI-generated messages can be used to make smishing messages more sophisticated and difficult to discern as fraudulent."
            },
            {
                "a3": "Correct. Converting messages to voice messages can make them appear more legitimate."
            },
            {
                "a4": "Correct. All of the listed answers are advanced techniques that attackers use in smishing attacks."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Architecture assessment",
        "level": "intermediate",
        "question": "Which tool is used in architecture assessment to help identify potential risks in the system?",
        "answers": [
            {
                "a1": "Code review"
            },
            {
                "a2": "Simulation"
            },
            {
                "a3": "Testing"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Code review is a tool used in architecture assessment, but it does not identify risks in the system on its own."
            },
            {
                "a2": "Simulation is a tool used in architecture assessment, but it does not identify risks in the system on its own."
            },
            {
                "a3": "Testing is a tool used in architecture assessment, but it does not identify risks in the system on its own."
            },
            {
                "a4": "Correct. Code review, simulation, and testing are tools used in architecture assessment to identify potential risks in the system."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Software composition analysis (SCA)",
        "level": "intermediate",
        "question": "What is the main purpose of SCA in software development?",
        "answers": [
            {
                "a1": "To provide visibility into the composition of software applications."
            },
            {
                "a2": "To help companies stay on top of updates and changes to maintain overall stability and integrity."
            },
            {
                "a3": "To control the dependencies used in the software code."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. One of the main purposes of SCA is to provide visibility into the composition of software applications."
            },
            {
                "a2": "Partially correct. One of the main purposes of SCA is to help companies stay on top of updates and changes to maintain overall stability and integrity."
            },
            {
                "a3": "Partially correct. One of the main purposes of SCA is to control the dependencies used in the software code."
            },
            {
                "a4": "Correct. All of the above are main purposes of SCA in software development."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "API Architecture",
        "level": "beginner",
        "question": "What does API stand for?",
        "answers": [
            {
                "a1": "Application Programming Interface"
            },
            {
                "a2": "Advanced Program Integration"
            },
            {
                "a3": "Automated Process Instrumentation"
            },
            {
                "a4": "Adaptive Program Implementation"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct! An API is an Application Programming Interface."
            },
            {
                "a2": "Incorrect. API stands for Application Programming Interface."
            },
            {
                "a3": "Incorrect. API stands for Application Programming Interface."
            },
            {
                "a4": "Incorrect. API stands for Application Programming Interface."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Dynamic application security testing (DAST)",
        "level": "expert",
        "question": "Which of the following is a limitation of DAST tools that can be addressed by using complementary testing approaches?",
        "answers": [
            {
                "a1": "DAST tools cannot test the security of APIs"
            },
            {
                "a2": "DAST tools are not effective at identifying vulnerabilities in mobile applications"
            },
            {
                "a3": "DAST tools cannot test for business logic flaws in the application"
            },
            {
                "a4": "DAST tools are not capable of testing for vulnerabilities in the server infrastructure"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. DAST tools can be used to test the security of APIs in many cases."
            },
            {
                "a2": "Incorrect. While DAST tools may not be as effective at identifying vulnerabilities in mobile applications, other testing approaches can be used for this purpose."
            },
            {
                "a3": "Correct. DAST tools are not generally effective at testing for business logic flaws, which can be difficult to detect using automated tools alone."
            },
            {
                "a4": "Incorrect. DAST tools can test the security of the server infrastructure, but may not be effective at identifying all types of vulnerabilities. Complementary testing approaches may be needed for comprehensive testing."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Credential Stuffing",
        "level": "expert",
        "question": "How can companies and organizations protect against credential stuffing attacks?",
        "answers": [
            {
                "a": "Conduct regular password audits to identify weak and reused passwords."
            },
            {
                "b": "Implement multi-factor authentication to add an extra layer of security."
            },
            {
                "c": "Monitor login attempts and block suspicious activity."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Partially correct. Conducting regular password audits is an important step in protecting against credential stuffing attacks, but it is not the only one."
            },
            {
                "b": "Partially correct. Implementing multi-factor authentication makes it more difficult for hackers to gain access to user accounts, but it is not the only defense."
            },
            {
                "c": "Partially correct. Monitoring login attempts and blocking suspicious activity can help prevent credential stuffing attacks, but it is not the only thing companies should do to protect against cyber threats."
            },
            {
                "d": "Correct. Combining all of these measures is the most effective way for companies and organizations to protect against credential stuffing attacks and other cyber threats. It is important to have a comprehensive and layered approach to cybersecurity."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "CI-CD tools",
        "level": "beginner",
        "question": "What do CI and CD stand for in software development?",
        "answers": [
            {
                "a1": "Continuous Integration and Continuous Delivery"
            },
            {
                "a2": "Continuous Iteration and Continuous Deployment"
            },
            {
                "a3": "Continuous Improvement and Continuous Deployment"
            },
            {
                "a4": "Continuous Improvement and Continuous Delivery"
            }
        ],
        "correct_answer": [
            "a1"
        ],
        "explanations": [
            {
                "a1": "Correct! CI and CD stand for Continuous Integration and Continuous Delivery respectively."
            },
            {
                "a2": "Incorrect. Continuous Iteration is not a term used in CI/CD."
            },
            {
                "a3": "Incorrect. While there is a continuous improvement aspect to CI/CD, it's not the primary focus of these tools."
            },
            {
                "a4": "Incorrect. While continuous improvement is part of the goal of CI/CD, it's not the focus of the specific terms themselves."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Identity Theft Prevention",
        "level": "intermediate",
        "question": "Which of the following is an example of a phishing scam?",
        "answers": [
            {
                "a1": "A phone call from a legitimate bank asking for financial information"
            },
            {
                "a2": "An email containing a suspicious attachment"
            },
            {
                "a3": "A pop-up message claiming your computer has been infected with a virus"
            },
            {
                "a4": "A text message offering a free vacation in exchange for personal information"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. A phone call can be a legitimate way for a bank to contact you, but you should still be cautious and not disclose personal information."
            },
            {
                "a2": "Correct. Phishing scams often come in the form of emails containing suspicious attachments or links that ask you to enter personal information on a fake website."
            },
            {
                "a3": "Incorrect. A pop-up message may indicate that your computer has been infected with a virus, but it is not a phishing scam."
            },
            {
                "a4": "Incorrect. A text message offering a free vacation is likely a scam, but not necessarily a phishing scam."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "Understanding your system and environment",
        "level": "beginner",
        "question": "What is involved in understanding a system and environment for effective threat modeling?",
        "answers": [
            {
                "a": "Evaluating user roles, data and asset classifications, and system architecture only"
            },
            {
                "b": "Analyzing potential risks due to system components"
            },
            {
                "c": "Evaluating external factors such as vendors, suppliers, and partners only"
            },
            {
                "d": "Evaluating user roles, data and asset classifications, system architecture, and external factors such as vendors, suppliers, and partners"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Incorrect. Evaluating external factors and architecture are also important."
            },
            {
                "b": "Incorrect. Understanding the system and environment involves more than just analyzing risks due to system components."
            },
            {
                "c": "Incorrect. Evaluating user roles and data classifications are also important."
            },
            {
                "d": "Correct. Understanding a system and environment for effective threat modeling involves evaluating user roles, data and asset classifications, system architecture, and external factors such as vendors, suppliers, and partners to identify potential risks and make informed decisions about risk management."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Sharing Data and Documents Securely",
        "level": "expert",
        "question": "What is the purpose of using Data Loss Prevention (DLP) solutions for sharing sensitive data within an organization?",
        "answers": [
            {
                "a": "To detect and prevent unauthorized access to sensitive data"
            },
            {
                "b": "To identify possible data breaches and stop them before they occur"
            },
            {
                "c": "To prevent accidental or intentional leaks of sensitive data"
            },
            {
                "d": "All of the above"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Partially correct. DLP solutions can detect and prevent unauthorized access to sensitive data, but it also serves other purposes."
            },
            {
                "b": "Partially correct. DLP solutions can identify possible data breaches and stop them before they occur, but it also serves other purposes."
            },
            {
                "c": "Partially correct. DLP solutions can prevent accidental or intentional leaks of sensitive data, but it also serves other purposes."
            },
            {
                "d": "Correct. DLP solutions detect, prevent, and mitigate data loss incidents by monitoring, detecting, and blocking sensitive data transfer or use."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Risk, threats, and vulnerabilities",
        "level": "beginner",
        "question": "What are some examples of potential hazards or dangers to a system, organization, or individual?",
        "answers": [
            {
                "a1": "Security breaches and attacks from hackers"
            },
            {
                "a2": "Physical threats like disasters and accidents"
            },
            {
                "a3": "Human error"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Security breaches and attacks from hackers pose a risk to systems and organizations."
            },
            {
                "a2": "Correct. Physical threats like disasters and accidents can cause damage and disruption to systems and organizations."
            },
            {
                "a3": "Correct. Human error can lead to security breaches and system failures."
            },
            {
                "a4": "Correct. All of these are examples of potential hazards or dangers to a system, organization, or individual."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "applied to application",
        "level": "intermediate",
        "question": "What are the key components of a threat model?",
        "answers": [
            {
                "a1": "Asset, Threats, Vulnerabilities, Security Controls and Mitigations."
            },
            {
                "a2": "Software Bugs, Network Traffic, User Passwords, Testing Frameworks."
            },
            {
                "a3": "Encryption Algorithms, Firewall Rules, SSL Certificates, DNS Resolution."
            },
            {
                "a4": "Log Files, Intrusion Detection Systems, Server Configurations, Threat Intelligence."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. The key components of a threat model are assets, threats, vulnerabilities, security controls, and mitigations."
            },
            {
                "a2": "Incorrect. Software bugs and user passwords are vulnerabilities, but they are not the only components of a threat model."
            },
            {
                "a3": "Incorrect. Encryption algorithms, firewall rules, SSL certificates, and DNS resolution are all security controls, but they are not the only components of a threat model."
            },
            {
                "a4": "Incorrect. Log files, intrusion detection systems, server configurations, and threat intelligence are all security controls, but they are not the only components of a threat model."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Privacy",
        "level": "advanced",
        "question": "What is a VPN and how does it enhance online privacy?",
        "answers": [
            {
                "a1": "A virtual personal network that encrypts internet traffic and masks IP addresses, enhancing online privacy and security."
            },
            {
                "a2": "A video processing network that enhances the quality of online video streaming."
            },
            {
                "a3": "A virtual personal network that allows users to remotely access their work computers."
            },
            {
                "a4": "A system software that prevents unauthorized access to a computer network."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. VPNs create a secure connection between a user's device and the internet, encrypting the traffic and masking the user's IP address, making it difficult for hackers or other outside parties to intercept or track the user's online activity."
            },
            {
                "a2": "Incorrect. A VPN is not related to video processing or streaming."
            },
            {
                "a3": "Incorrect. A VPN may allow for remote access to work computers, but that is not its primary purpose."
            },
            {
                "a4": "Incorrect. A firewall may prevent unauthorized access to a computer network but is different from a VPN."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Interactive Application Security Testing (IAST)",
        "level": "expert",
        "question": "What is the difference between an agent-based IAST tool and a sensor-based IAST tool?",
        "answers": [
            {
                "a": "An agent-based IAST tool requires a server to process the data generated during runtime, while a sensor-based IAST tool sends data directly to a cloud-based security platform for analysis."
            },
            {
                "b": "An agent-based IAST tool monitors the application's inputs and outputs, while a sensor-based IAST tool integrates with the application to detect vulnerabilities."
            },
            {
                "c": "An agent-based IAST tool provides more accurate and detailed results, while a sensor-based IAST tool is faster and more lightweight."
            },
            {
                "d": "An agent-based IAST tool is more expensive than a sensor-based IAST tool, which is open-source and freely available."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct! An agent-based IAST tool installs a server to process the data generated during runtime, while a sensor-based IAST tool sends data directly to a cloud-based security platform for analysis."
            },
            {
                "b": "Incorrect. This describes the basic function of IAST, not the key difference between agent-based and sensor-based tools."
            },
            {
                "c": "Incorrect. This describes some of the tradeoffs between agent-based and sensor-based tools, but it is not a reliable way to distinguish them."
            },
            {
                "d": "Incorrect. While cost is a valid factor to consider, it is not the defining characteristic that separates agent-based and sensor-based IAST tools."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Incident Response",
        "level": "beginner",
        "question": "What is the main goal of incident response?",
        "answers": [
            {
                "a1": "Detect and prevent future incidents"
            },
            {
                "a2": "Identify and contain the incident"
            },
            {
                "a3": "Investigate the cause of the incident"
            },
            {
                "a4": "Restore service to normal operation"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Detecting and preventing future incidents is one of the outcomes of incident response, but not the main goal."
            },
            {
                "a2": "Correct. Identifying and containing the incident is the main goal of incident response."
            },
            {
                "a3": "Incorrect. Investigating the cause of the incident is important but not the main goal of incident response."
            },
            {
                "a4": "Incorrect. Restoring service to normal operation is one of the outcomes of incident response, but not the main goal."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Security logging and monitoring",
        "level": "intermediate",
        "question": "What is the difference between event logging and event monitoring?",
        "answers": [
            {
                "a1": "Event logging collects and stores data, while event monitoring analyzes that data in real-time."
            },
            {
                "a2": "Event logging analyzes data in real-time, while event monitoring collects and stores that data."
            },
            {
                "a3": "There is no difference between event logging and event monitoring."
            },
            {
                "a4": "Event logging and event monitoring are the same thing."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Event logging involves collecting and storing data from various sources, while event monitoring involves analyzing that data in real-time to detect potential security threats."
            },
            {
                "a2": "Incorrect. This answer is the opposite of what event logging and event monitoring actually refer to."
            },
            {
                "a3": "Incorrect. There is a significant difference between event logging and event monitoring, as described in answer 1."
            },
            {
                "a4": "Incorrect. Event logging and event monitoring are two separate activities that serve distinct purposes."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Privacy",
        "level": "intermediate",
        "question": "What is the most secure way to store passwords?",
        "answers": [
            {
                "a1": "Writing them on a piece of paper and keeping it in a safe place."
            },
            {
                "a2": "Using a password management tool."
            },
            {
                "a3": "Using the same password for all accounts to remember it easily."
            },
            {
                "a4": "Sharing passwords with trusted individuals."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Writing passwords on paper can still pose a security risk if the paper is lost or stolen, and keeping it in a safe place may not always be easily accessible."
            },
            {
                "a2": "Correct. Password management tools securely store and encrypt passwords, allowing individuals to use unique and complex passwords for each account without having to remember them all."
            },
            {
                "a3": "Incorrect. Using the same password for all accounts increases the risk of multiple accounts being compromised if one password is exposed."
            },
            {
                "a4": "Incorrect. Sharing passwords with others, even trusted individuals, can increase the risk of the password being compromised or misused."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "CI-CD tools",
        "level": "expert",
        "question": "What is GitOps and how does it relate to CI/CD?",
        "answers": [
            {
                "a1": "GitOps is an approach to managing infrastructure using Git, and it's used in conjunction with CI/CD to automate infrastructure changes along with code changes."
            },
            {
                "a2": "GitOps is a particular CI/CD tool that integrates with Git repositories, enabling automatic testing and deployment of changes."
            },
            {
                "a3": "GitOps is a workflow for using Git branches to manage different versions of code and easily coordinate deployment across teams. It's used with CI/CD tools to ensure timely delivery of updates."
            },
            {
                "a4": "GitOps is a methodology that combines Git version control with DevOps practices, including CI/CD. It enables infrastructure as code in a way that's easily repeatable and verifiable."
            }
        ],
        "correct_answer": [
            "a4"
        ],
        "explanations": [
            {
                "a1": "Close, but not quite. GitOps is a methodology, not just a tool or approach to infrastructure management."
            },
            {
                "a2": "Incorrect. GitOps is not a specific tool, but rather a methodology that can be used with a variety of CI/CD tools."
            },
            {
                "a3": "This is not an accurate description of GitOps. While Git branches and version control are useful aspects of GitOps, it goes beyond coordination and delivery of code."
            },
            {
                "a4": "Correct! GitOps is a methodology that combines Git version control with DevOps practices, including CI/CD. It's used to enable infrastructure as code that can be easily repeated and verified."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Data Protection and Privacy Architecture",
        "level": "expert",
        "question": "What is the difference between anonymization and pseudonymization of personal data under the General Data Protection Regulation (GDPR)?",
        "answers": [
            {
                "a": "Anonymization destroys any means of association between personal data and its owner, while pseudonymization replaces directly identifying attributes with another identifier"
            },
            {
                "b": "Anonymization is only applicable to sensitive data types, while pseudonymization is applied to all data types"
            },
            {
                "c": "Anonymization is not recognized as a viable protection measure under GDPR, pseudonymization is the only recognized protection measure"
            },
            {
                "d": "Both terms refer to different means of data encryption to prevent unauthorized access"
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Anonymization completely removes any means of association between personal data and its owner, while pseudonymization substitutes directly identifying attributes with another identifier, making re-identification more difficult."
            },
            {
                "b": "Incorrect. Anonymization can be applied to all types of personal data, not just sensitive data types."
            },
            {
                "c": "Incorrect. Anonymization is recognized under GDPR as a viable means of protecting personal data, alongside pseudonymization and encryption."
            },
            {
                "d": "Incorrect. While both anonymization and pseudonymization are related to data protection, they are not means of encryption."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Business Logic Architecture",
        "level": "expert",
        "question": "What is the difference between business logic and business rules?",
        "answers": [
            {
                "a1": "Business logic refers to the overall architecture of a software system, while business rules are the specific guidelines for how to handle data and transactions."
            },
            {
                "a2": "Business logic refers to the way in which business rules are implemented within a software system, while business rules provide the specific parameters for how the system should operate."
            },
            {
                "a3": "Business logic refers to the algorithms and decision-making capabilities of a software system, while business rules are the specific procedures and policies that guide how the system should behave."
            },
            {
                "a4": "Business logic refers to the performance and functionality of a software system, while business rules provide the specific requirements for how the system should operate."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. While business rules are a specific part of Business Logic Architecture, business logic is not defined solely by the guidelines for how to handle data and transactions."
            },
            {
                "a2": "Incorrect. Business logic is not defined solely by the way in which business rules are implemented within a software system."
            },
            {
                "a3": "Correct. Business logic refers to the algorithms and decision-making capabilities of a software system and how it handles inputs and outputs, while business rules are the specific procedures and policies that guide how the system should behave based on those inputs and outputs."
            },
            {
                "a4": "Incorrect. Business logic is not defined solely by the performance and functionality of a software system."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Malware",
        "level": "intermediate",
        "question": "What is a common way that malware spreads?",
        "answers": [
            {
                "a1": "Through manual installation by the user"
            },
            {
                "a2": "Through browsers that are not up to date"
            },
            {
                "a3": "Through email attachments"
            },
            {
                "a4": "Through social media posts"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Malware typically spreads without the user's knowledge."
            },
            {
                "a2": "Incorrect. Browsers that are not up to date can be vulnerable to attacks, but malware typically spreads through other means."
            },
            {
                "a3": "Correct. Email attachments are a common way for malware to spread."
            },
            {
                "a4": "Incorrect. Malware can spread through social media but it is not one of the most common methods."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Workplace Security",
        "level": "intermediate",
        "question": "What are some examples of how employers can ensure workplace security?",
        "answers": [
            {
                "a": "Educating employees on security protocols, installing security cameras, and conducting background checks on new hires."
            },
            {
                "b": "Using only open-source software on company computers, providing employees with Blackberries instead of iPhones, and implementing strict password policies."
            },
            {
                "c": "Providing employees with a list of emergency contacts, conducting fire drills, and sending monthly security newsletters."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Employers can ensure workplace security by educating employees on security protocols, installing security cameras, using access control systems, and regularly conducting security assessments."
            },
            {
                "b": "Incorrect. These options are not related to workplace security."
            },
            {
                "c": "Incorrect. These options are related to emergency preparedness and education, but not necessarily workplace security."
            },
            {
                "d": "Incorrect. Only option a lists examples of specific measures that can be taken to ensure workplace security."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Vishing (Voice Phishing)",
        "level": "intermediate",
        "question": "Which of the following is a common pretext used in vishing attacks?",
        "answers": [
            {
                "a1": "Urgent action required."
            },
            {
                "a2": "System upgrade needed."
            },
            {
                "a3": "Account has been compromised."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. \"Urgent action required\" is a common pretext used in vishing attacks, but there are others as well."
            },
            {
                "a2": "Incorrect. \"System upgrade needed\" is a common pretext used in vishing attacks, but there are others as well."
            },
            {
                "a3": "Incorrect. \"Account has been compromised\" is a common pretext used in vishing attacks, but there are others as well."
            },
            {
                "a4": "Correct. \"Urgent action required,\" \"system upgrade needed,\" and \"account has been compromised\" are all common pretexts used in vishing attacks."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "Using attack trees",
        "level": "beginner",
        "question": "What are attack trees used for in threat modeling?",
        "answers": [
            {
                "a1": "To evaluate various mitigation strategies for known attack paths."
            },
            {
                "a2": "To identify and prioritize vulnerabilities in a system."
            },
            {
                "a3": "To simulate the impact of potential security threats on a system."
            },
            {
                "a4": "To design secure systems from scratch."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Attack trees are not used to evaluate mitigation strategies."
            },
            {
                "a2": "Correct. Attack trees are used to identify and prioritize vulnerabilities."
            },
            {
                "a3": "Incorrect. Attack trees are not used to simulate the impact of potential security threats."
            },
            {
                "a4": "Incorrect. Attack trees are not used to design secure systems from scratch."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Physical Safety",
        "level": "beginner",
        "question": "What is physical safety?",
        "answers": [
            {
                "a": "Protecting oneself and others from physical harm or danger"
            },
            {
                "b": "Preventing cyber attacks"
            },
            {
                "c": "Following traffic rules"
            },
            {
                "d": "None of the above"
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct! Physical safety refers to protecting oneself and others from physical harm or danger. This includes understanding emergency procedures, identifying and reporting unsafe conditions, following safety protocols, and staying alert and aware of one's surroundings."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Disaster Recovery",
        "level": "intermediate",
        "question": "What is the purpose of a disaster recovery plan?",
        "answers": [
            {
                "a1": "To restore operations after an interruption in business continuity."
            },
            {
                "a2": "To develop response plans to natural disasters."
            },
            {
                "a3": "To increase revenue for the company."
            },
            {
                "a4": "To ensure employee safety during unforeseen events."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. The purpose of a disaster recovery plan is to restore operations as quickly as possible after an interruption in business continuity caused by natural disasters, cyber attacks, or human errors. Developing risk management plans and backup strategies are crucial to effectively execute the plan."
            },
            {
                "a2": "Incorrect. While a disaster recovery plan may involve developing response plans for natural disasters, its scope goes beyond natural disasters and also covers cyber attacks and human errors."
            },
            {
                "a3": "Incorrect. The primary purpose of a disaster recovery plan is to restore operations and ensure business continuity, not to increase revenue."
            },
            {
                "a4": "Incorrect. While employee safety is important, the purpose of a disaster recovery plan is to restore operations and ensure business continuity."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Data governance and data privacy",
        "level": "beginner",
        "question": "What is the purpose of data governance policies?",
        "answers": [
            {
                "a1": "To properly collect, process, and store data"
            },
            {
                "a2": "To prevent unauthorized access, use, and disclosure of data"
            },
            {
                "a3": "To build customer trust and promote responsible data management practices"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. This is only one of the purposes of data governance policies."
            },
            {
                "a2": "Incorrect. This is the purpose of data privacy strategies, but not of data governance policies."
            },
            {
                "a3": "Incorrect. This is one of the benefits of implementing effective data governance policies, but not their purpose."
            },
            {
                "a4": "Correct. Effective data governance policies ensure proper collection, processing, and storage of data, while data privacy strategies prevent unauthorized access, use, and disclosure of data. These measures help build customer trust, mitigate risks of data breaches or data misuse, and promote responsible data management practices."
            }
        ]
    },
    {
        "topic": "Testing",
        "category": "Foundations for Software Testing",
        "level": "expert",
        "question": "What is the difference between black-box testing and white-box testing?",
        "answers": [
            {
                "a1": "Black-box testing is a technique that is based on the internal workings of the system or component being tested, while white-box testing is a technique that is based only on the external functionality of the system or component being tested."
            },
            {
                "a2": "Black-box testing is a technique that is based only on the external functionality of the system or component being tested, while white-box testing is a technique that is based on the internal workings of the system or component being tested."
            },
            {
                "a3": "Black-box testing and white-box testing have nothing to do with the internal or external aspects of the system or component being tested."
            },
            {
                "a4": "Black-box testing and white-box testing are two names for the same technique."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Black-box testing is a technique that is based only on the external functionality of the system or component being tested, while white-box testing is a technique that is based on the internal workings of the system or component being tested."
            },
            {
                "a2": "Correct. Black-box testing is a technique that is based only on the external functionality of the system or component being tested, while white-box testing is a technique that is based on the internal workings of the system or component being tested."
            },
            {
                "a3": "Incorrect. Black-box testing and white-box testing are related to the internal and external aspects of the system or component being tested."
            },
            {
                "a4": "Incorrect. Black-box testing and white-box testing are different techniques with different names."
            }
        ]
    },
    {
        "topic": "Access Control",
        "category": "RBAC vs ABAC vs ReBAC",
        "level": "intermediate",
        "question": "What is the main difference between RBAC and ABAC?",
        "answers": [
            {
                "a1": "RBAC uses attributes such as user identity or location, while ABAC restricts access based on job function."
            },
            {
                "a2": "ABAC uses attributes such as user identity or location, while RBAC restricts access based on job function."
            },
            {
                "a3": "RBAC and ABAC are the same thing."
            },
            {
                "a4": "RBAC and ABAC use relationship-based access control."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. The description of RBAC and ABAC is flipped."
            },
            {
                "a2": "Correct. The main difference between RBAC and ABAC is that RBAC restricts access based on job function, while ABAC uses attributes such as user identity or location to restrict access."
            },
            {
                "a3": "Incorrect. RBAC and ABAC are two different access control types with distinct features."
            },
            {
                "a4": "Incorrect. Relationship-Based Access Control is another access control type described, but not the feature that distinguishes RBAC and ABAC."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "Using attack trees",
        "level": "advanced",
        "question": "What is a DFD and how is it used in conjunction with attack trees?",
        "answers": [
            {
                "a1": "DFD is a data transfer diagram used to visualize attack paths in attack trees."
            },
            {
                "a2": "DFD is a diagram used to map system components and data flows for better analysis of threats."
            },
            {
                "a3": "DFD is a tool used to simulate attacks on a system modeled with attack trees."
            },
            {
                "a4": "DFD is a visualization tool used to map security controls and identify vulnerabilities in an attack tree."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. DFD is not used to visualize attack paths."
            },
            {
                "a2": "Correct. DFD is a diagram used to map system components and data flows for better analysis of threats, usually in conjunction with attack trees."
            },
            {
                "a3": "Incorrect. DFD is not used to simulate attacks on a system modeled with attack trees."
            },
            {
                "a4": "Incorrect. While DFD is a visualization tool, it is not used to map security controls and identify vulnerabilities in an attack tree."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "Using attack trees",
        "level": "intermediate",
        "question": "What is a leaf node in an attack tree for?",
        "answers": [
            {
                "a1": "To represent an attacker's starting point in the attack scenario."
            },
            {
                "a2": "To represent a possible attack path."
            },
            {
                "a3": "To represent the consequences of a successful attack."
            },
            {
                "a4": "To represent a mitigation strategy for the attack."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. A leaf node does not represent an attacker's starting point."
            },
            {
                "a2": "Incorrect. A leaf node does not represent a possible attack path."
            },
            {
                "a3": "Correct. A leaf node represents the consequences of a successful attack."
            },
            {
                "a4": "Incorrect. A leaf node does not represent a mitigation strategy for the attack."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Account Takeover",
        "level": "expert",
        "question": "What are some indicators that an account takeover has occurred?",
        "answers": [
            {
                "a": "An unauthorized transaction on the account."
            },
            {
                "b": "A password change notification."
            },
            {
                "c": "An increase in failed login attempts."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Correct. An unauthorized transaction is a clear sign that an account takeover has occurred."
            },
            {
                "b": "Correct. If a user receives a notification that their password has been changed and they did not initiate it, that is a clear sign that an account takeover has occurred."
            },
            {
                "c": "Correct. An increase in failed login attempts could suggest that someone is attempting to gain access to the account."
            },
            {
                "d": "Correct. All of these indicators can be evidence of an account takeover."
            }
        ]
    },
    {
        "topic": "Social Media",
        "category": "Staying Safe on Social Media",
        "level": "advanced",
        "question": "Why is it important to limit your social media profile's visibility?",
        "answers": [
            {
                "a1": "To keep your information private"
            },
            {
                "a2": "To prevent potential employers from seeing your posts"
            },
            {
                "a3": "To reduce the risk of identity theft"
            },
            {
                "a4": "To prevent strangers from finding your personal information"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Though keeping your information private is an essential aspect of social media safety, it's not the only reason to limit a social media profile's visibility."
            },
            {
                "a2": "Incorrect. Employers nowadays may go through potential employees' social media profiles, but that is not the main reason to limit your profile's visibility."
            },
            {
                "a3": "Incorrect. Although limiting your profile's visibility can be an effective way to reduce the risk of identity theft, it is not the main reason."
            },
            {
                "a4": "Correct! By limiting who can see your profile, you can prevent strangers or cybercriminals from finding your personal information and using it for nefarious purposes."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "applied to application",
        "level": "advanced",
        "question": "What is the difference between static and dynamic threat modeling?",
        "answers": [
            {
                "a1": "Static threat modeling is performed before code is written, while dynamic threat modeling is performed after code is deployed."
            },
            {
                "a2": "Static threat modeling is focused on the design and architecture of an application, while dynamic threat modeling is focused on the runtime behavior of an application."
            },
            {
                "a3": "Static threat modeling is performed by developers, while dynamic threat modeling is performed by security professionals."
            },
            {
                "a4": "Static threat modeling is a manual process, while dynamic threat modeling is an automated process."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Static threat modeling can be performed at any stage of the development process, while dynamic threat modeling is typically performed after code is deployed."
            },
            {
                "a2": "Correct. Static threat modeling focuses on the design and architecture of an application, while dynamic threat modeling focuses on the runtime behavior of an application."
            },
            {
                "a3": "Incorrect. Both static and dynamic threat modeling can be performed by developers and security professionals."
            },
            {
                "a4": "Incorrect. Both static and dynamic threat modeling can be manual or automated processes."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Internet Safety",
        "level": "beginner",
        "question": "What is Internet Safety?",
        "answers": [
            {
                "a1": "Protecting personal information and avoiding online scams."
            },
            {
                "a2": "Connecting to public Wi-Fi without a VPN."
            },
            {
                "a3": "Sharing personal information with everyone online."
            },
            {
                "a4": "None of the above."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Internet Safety focuses on protecting personal information, preventing cyberbullying, and avoiding online scams."
            },
            {
                "a2": "Incorrect. It is not safe to connect to public Wi-Fi without a VPN."
            },
            {
                "a3": "Incorrect. It is not safe to share personal information with everyone online."
            },
            {
                "a4": "Incorrect. The answer is a1."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Malware",
        "level": "beginner",
        "question": "What is malware?",
        "answers": [
            {
                "a1": "A type of software that helps your computer run faster"
            },
            {
                "a2": "A type of software developed to harm or disrupt computer systems, steal sensitive data, or extort money"
            },
            {
                "a3": "A type of software used for video editing"
            },
            {
                "a4": "A type of software used to create presentations"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Malware is not software that helps your computer run faster."
            },
            {
                "a2": "Correct. This is the definition of malware."
            },
            {
                "a3": "Incorrect. Malware is not software used for video editing."
            },
            {
                "a4": "Incorrect. Malware is not software used to create presentations."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Secure Software Development Lifecycle",
        "level": "advanced",
        "question": "What is the primary goal of deploying secure software in an organization?",
        "answers": [
            {
                "a1": "To reduce software deployment time"
            },
            {
                "a2": "To decrease software maintenance costs"
            },
            {
                "a3": "To ensure that software is free of security vulnerabilities"
            },
            {
                "a4": "To increase software complexity"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. The primary goal of deploying secure software is not to reduce deployment time."
            },
            {
                "a2": "Incorrect. The primary goal of deploying secure software is not to decrease maintenance costs."
            },
            {
                "a3": "Correct! The primary goal of deploying secure software is to ensure that it is free of security vulnerabilities."
            },
            {
                "a4": "Incorrect. The primary goal of deploying secure software is not to increase software complexity."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Safe Internet Usage",
        "level": "expert",
        "question": "What is the purpose of two-factor authentication (2FA)?",
        "answers": [
            {
                "a1": "To make it harder for hackers to gain access to online accounts"
            },
            {
                "a2": "To prevent viruses from infecting systems"
            },
            {
                "a3": "To increase internet connection speed"
            },
            {
                "a4": "To encrypt email messages"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Two-factor authentication adds an extra layer of security to online accounts by requiring a second form of authentication, such as a code sent via text message or generated by an app, in addition to a password."
            },
            {
                "a2": "Incorrect. Two-factor authentication does not prevent viruses from infecting systems."
            },
            {
                "a3": "Incorrect. Two-factor authentication does not affect internet connection speed."
            },
            {
                "a4": "Incorrect. Encryption of email messages requires a different technology or software tool."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Session Management Architecture",
        "level": "beginner",
        "question": "What does Session Management Architecture refer to?",
        "answers": [
            {
                "a1": "Managing and tracking user sessions within a software system"
            },
            {
                "a2": "Tracking user activity on a website"
            },
            {
                "a3": "Managing user account credentials"
            },
            {
                "a4": "Managing server resources"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Session Management Architecture involves managing and tracking user sessions within a software system."
            },
            {
                "a2": "Incorrect. This does not fully define Session Management Architecture."
            },
            {
                "a3": "Incorrect. This is only one component of Session Management Architecture."
            },
            {
                "a4": "Incorrect. This is not related to Session Management Architecture."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Security requirements",
        "level": "beginner",
        "question": "What is the purpose of security requirements?",
        "answers": [
            {
                "a1": "To ensure safety and data protection"
            },
            {
                "a2": "To increase profits"
            },
            {
                "a3": "To reduce employee turnover"
            },
            {
                "a4": "To update software automatically"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct - Security requirements provide guidelines to follow for protecting systems, networks, and data from threats such as malware, hacking, and unauthorized access."
            },
            {
                "a2": "Incorrect - While implementing security requirements may indirectly lead to increased profits, that is not the primary purpose."
            },
            {
                "a3": "Incorrect - Security requirements are not designed to reduce employee turnover."
            },
            {
                "a4": "Incorrect - Automatically updating software is not specifically related to security requirements."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Disaster Recovery",
        "level": "expert",
        "question": "What are the best practices for testing a disaster recovery plan?",
        "answers": [
            {
                "a1": "Conducting frequent risk assessments, testing backup strategies, and running tabletop simulations."
            },
            {
                "a2": "Running penetration testing, disaster simulation, and disrupting live systems to test recovery procedures."
            },
            {
                "a3": "Conducting financial audits, resource allocation optimization, and employee performance evaluations."
            },
            {
                "a4": "Conducting customer surveys, legal reviews, and regulatory inspections."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. The best practices for testing a disaster recovery plan are to conduct frequent risk assessments, test backup strategies, and run tabletop simulations. Regular testing identifies gaps and vulnerabilities and allows for necessary improvements. Running tabletop exercises that simulate emergencies allows key stakeholders to practice their roles and mitigate confusion in a real emergency situation."
            },
            {
                "a2": "Incorrect. While penetration testing, disaster simulation, and testing recovery procedures are important, disrupting live systems to test these procedures can have severe consequences."
            },
            {
                "a3": "Incorrect. Financial audits, resource allocation optimization, and employee evaluations are important business management practices but are not specific to disaster recovery."
            },
            {
                "a4": "Incorrect. Conducting customer surveys, legal reviews, and regulatory inspections are crucial in overall business management but are not specific to testing disaster recovery plans."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Managing and treating risk",
        "level": "expert",
        "question": "What is cyber risk quantification, and how is it used in risk management?",
        "answers": [
            {
                "a1": "It is the process of assigning a numerical value to the likelihood and impact of a cyber risk event, in order to estimate the financial impact on the organization"
            },
            {
                "a2": "It is the process of outsourcing cyber risk management to a third-party provider, in order to reduce exposure to risk"
            },
            {
                "a3": "It is the process of conducting a vulnerability assessment to determine the organization's susceptibility to cyber attacks, and using this information to develop a proactive risk management strategy"
            },
            {
                "a4": "It is the process of implementing cybersecurity measures without conducting any prior risk assessment, in order to be as secure as possible"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Cyber risk quantification is a method used to estimate the financial impact of a cyber risk event on an organization, by assigning a numerical value to the likelihood and impact of such an event."
            },
            {
                "a2": "Incorrect. Cyber risk quantification is an internal process, and not one that can be effectively outsourced."
            },
            {
                "a3": "Incorrect. While a vulnerability assessment may be a component of cyber risk management, that is not the same thing as cyber risk quantification."
            },
            {
                "a4": "Incorrect. Cybersecurity measures should be implemented as part of a comprehensive risk management strategy that includes risk assessment and quantification."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Malicious Software Architecture",
        "level": "advanced",
        "question": "What is steganography-based malware?",
        "answers": [
            {
                "a1": "Malware that uses encryption to hide its malicious behavior"
            },
            {
                "a2": "Malware that hides its code within image files or other innocuous data"
            },
            {
                "a3": "Malware that exploits vulnerabilities in network protocols"
            },
            {
                "a4": "Malware that operates by creating clones of legitimate programs"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Encryption-based malware uses encryption to protect its malicious code from detection, but not to hide it completely."
            },
            {
                "a2": "Correct. Steganography-based malware is malware that hides its code within image files or other innocuous data. This makes it difficult to detect through traditional security measures that only scan for known malware signatures."
            },
            {
                "a3": "Incorrect. Network protocol-based malware exploits vulnerabilities in network protocols to attack a system or steal data, but does not necessarily involve hiding its code within other data."
            },
            {
                "a4": "Incorrect. Clone-based malware operates by imitating legitimate programs in order to bypass security checks, but does not necessarily involve hiding its code within other data."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Safety when Working from Home",
        "level": "expert",
        "question": "What should you do to provide ergonomic seating for preventing back pain while working from home?",
        "answers": [
            {
                "a1": "Choose a chair with a backrest that does not support your lower back"
            },
            {
                "a2": "Choose a chair with armrests that do not align with your desk height"
            },
            {
                "a3": "Choose a chair with a seat height that does not align with your keyboard height"
            },
            {
                "a4": "Choose a chair that allows your feet to touch the ground and provides lumbar support"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. A chair with a backrest that does not support your lower back can lead to back pain while working from home."
            },
            {
                "a2": "Incorrect. A chair with armrests that do not align with your desk height can lead to shoulder pain while working from home."
            },
            {
                "a3": "Incorrect. A chair with a seat height that does not align with your keyboard height can lead to neck pain while working from home."
            },
            {
                "a4": "Correct. A chair that allows your feet to touch the ground and provides lumbar support can help prevent back pain while working from home."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Configuration Architecture",
        "level": "intermediate",
        "question": "What are the goals of configuration architecture?",
        "answers": [
            {
                "a1": "Security and Privacy"
            },
            {
                "a2": "Usability and Performance"
            },
            {
                "a3": "Availability and Reliability"
            },
            {
                "a4": "Performance, Availability, Reliability, and Scalability"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Security and privacy are not the only goals of configuration architecture."
            },
            {
                "a2": "Incorrect. Usability and performance are not the only goals of configuration architecture."
            },
            {
                "a3": "Incorrect. Availability and reliability are important goals, but not the only goals of configuration architecture."
            },
            {
                "a4": "Correct. The purpose of configuration architecture is to ensure that a system architecture is able to meet the performance, availability, reliability and scalability criteria demanded by its users."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Software composition analysis (SCA)",
        "level": "expert",
        "question": "What are some examples of SCA tools?",
        "answers": [
            {
                "a1": "WhiteSource"
            },
            {
                "a2": "Nexus Lifecycle"
            },
            {
                "a3": "Black Duck Hub"
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. WhiteSource is a Software Composition Analysis tool that helps organizations manage the components of their software application by providing full visibility into their usage and offering control over vulnerabilities, licenses, and quality."
            },
            {
                "a2": "Partially correct. Nexus Lifecycle is a Software Composition Analysis tool that helps organizations manage risk, reduce rework, and smooth the application development workflow by checking for known security vulnerabilities, license restrictions, and outdated components."
            },
            {
                "a3": "Partially correct. Black Duck Hub is a Software Composition Analysis tool that helps organizations identify and manage software components in their applications and containers."
            },
            {
                "a4": "Correct. All of the above are examples of SCA tools used to manage and analyze software components in an application."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Dynamic application security testing (DAST)",
        "level": "intermediate",
        "question": "Which of the following is a limitation of DAST tools?",
        "answers": [
            {
                "a1": "DAST tools cannot test applications that require authentication to access"
            },
            {
                "a2": "DAST tools cannot provide suggestions for fixing vulnerabilities in the application code"
            },
            {
                "a3": "DAST tools can only identify vulnerabilities that are easily detected by automated scans"
            },
            {
                "a4": "DAST tools often produce false positives that need to be manually verified"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Many DAST tools are capable of testing authenticated applications."
            },
            {
                "a2": "Incorrect. DAST tools do provide suggestions for fixing vulnerabilities."
            },
            {
                "a3": "Incorrect. DAST tools are designed to detect a wide range of vulnerabilities, not just those that are easily detected by automated scans."
            },
            {
                "a4": "Correct. DAST tools often produce false positives, which can be time-consuming to manually verify and can reduce the efficiency of the testing process."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Staying Secure in your Workplace",
        "level": "expert",
        "question": "What is the difference between vulnerability scanning and penetration testing?",
        "answers": [
            {
                "a1": "Vulnerability scanning is an automated process of identifying security vulnerabilities, while penetration testing is a manual process of attempting to exploit those vulnerabilities."
            },
            {
                "a2": "Vulnerability scanning and penetration testing are the same thing."
            },
            {
                "a3": "Vulnerability scanning identifies software vulnerabilities, while penetration testing focuses on network vulnerabilities."
            },
            {
                "a4": "Vulnerability scanning is a proactive security measure, while penetration testing is a reactive measure in response to a security breach."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Vulnerability scanning is an automated process of identifying security vulnerabilities, while penetration testing is a manual process of attempting to exploit those vulnerabilities in order to simulate an attack and provide a more accurate picture of the network's security posture."
            },
            {
                "a2": "Incorrect. These are two distinct and different concepts within the broader realm of offensive security."
            },
            {
                "a3": "Incorrect. Vulnerability scanning can also be used to identify network vulnerabilities, and penetration testing can also identify software vulnerabilities."
            },
            {
                "a4": "Incorrect. Both vulnerability scanning and penetration testing can be proactive or reactive measures, depending on the organization's security strategy."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Malware",
        "level": "expert",
        "question": "What is the difference between a virus and a worm?",
        "answers": [
            {
                "a1": "A virus can spread itself to other computers while a worm can't."
            },
            {
                "a2": "A virus is more complex than a worm."
            },
            {
                "a3": "A worm is a type of virus."
            },
            {
                "a4": "A virus requires user interaction to spread while a worm can spread automatically."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Both a virus and a worm can spread themselves to other computers."
            },
            {
                "a2": "Incorrect. A worm can be just as complex as a virus."
            },
            {
                "a3": "Incorrect. A worm is not a type of virus - it is a separate class of malware."
            },
            {
                "a4": "Correct. A virus typically requires user interaction to spread while a worm can spread automatically without any user action."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Configuration Architecture",
        "level": "expert",
        "question": "What are some of the common challenges faced in configuration architecture?",
        "answers": [
            {
                "a1": "Large-scale systems and geographically distributed systems"
            },
            {
                "a2": "Complex dependencies and version control"
            },
            {
                "a3": "Security and Compliance"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. Large-scale systems and geographically distributed systems are one of the common challenges in configuration architecture, but not the only ones."
            },
            {
                "a2": "Partially correct. Complex dependencies and version control are one of the common challenges in configuration architecture, but not the only ones."
            },
            {
                "a3": "Partially correct. Security and compliance are one of the common challenges in configuration architecture, but not the only ones."
            },
            {
                "a4": "Correct. Configuration architecture can face challenges such as large-scale systems, geographically distributed systems, complex dependencies, version control, security, and compliance."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Product risk profiles",
        "level": "intermediate",
        "question": "What are some factors that can be analyzed with product risk profiles?",
        "answers": [
            {
                "a1": "The product's intended use."
            },
            {
                "a2": "The product's manufacturing process."
            },
            {
                "a3": "The product's potential environmental impacts."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. The intended use is a factor that can be analyzed with a product risk profile."
            },
            {
                "a2": "Partially correct. The manufacturing process is a factor that can be analyzed with a product risk profile."
            },
            {
                "a3": "Partially correct. The potential environmental impacts are a factor that can be analyzed with a product risk profile."
            },
            {
                "a4": "Correct. All of these factors can be analyzed with a product risk profile."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Security requirements",
        "level": "advanced",
        "question": "What is the purpose of security audits in relation to security requirements?",
        "answers": [
            {
                "a1": "To ensure compliance with security regulations"
            },
            {
                "a2": "To evaluate the effectiveness of security measures"
            },
            {
                "a3": "To identify potential security risks and weaknesses"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct - Security audits help ensure that organizations are following security regulations and guidelines."
            },
            {
                "a2": "Correct - Security audits evaluate the effectiveness of security measures currently in place."
            },
            {
                "a3": "Correct - Security audits identify potential security risks and weaknesses in order to proactively adjust security measures."
            },
            {
                "a4": "Correct - Security audits have all of the listed purposes, ensuring compliance, evaluating effectiveness, and identifying security risks."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Remote Work Security",
        "level": "beginner",
        "question": "What is remote work security mostly concerned about?",
        "answers": [
            {
                "a1": "Protecting confidential information while outside the office"
            },
            {
                "a2": "Maintaining good posture while working remotely"
            },
            {
                "a3": "Accessing public wifi networks"
            },
            {
                "a4": "Organizing digital files on the cloud"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Remote work security refers to securing digital assets and confidential information accessed outside the office."
            },
            {
                "a2": "Incorrect. Good posture is important for physical health but not relevant to remote work security."
            },
            {
                "a3": "Incorrect. Accessing public wifi networks can be dangerous, but it falls under the umbrella of remote work security."
            },
            {
                "a4": "Incorrect. Organizing digital files on the cloud is important for productivity but not relevant to remote work security."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Internet Safety",
        "level": "advanced",
        "question": "What is the role of antivirus software in Internet Safety?",
        "answers": [
            {
                "a1": "Antivirus software can protect against all cyber threats."
            },
            {
                "a2": "Antivirus software can detect and remove viruses, malware, and other malicious software."
            },
            {
                "a3": "Antivirus software can prevent cyberbullying."
            },
            {
                "a4": "None of the above."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Antivirus software is not foolproof and cannot protect against all cyber threats."
            },
            {
                "a2": "Correct. Antivirus software can detect and remove viruses, malware, and other malicious software that may compromise personal information."
            },
            {
                "a3": "Incorrect. Antivirus software cannot prevent cyberbullying directly."
            },
            {
                "a4": "Incorrect. The answer is a2."
            }
        ]
    },
    {
        "topic": "Social Media",
        "category": "Staying Safe on Social Media",
        "level": "beginner",
        "question": "What is the easiest step to protect your personal information on social media?",
        "answers": [
            {
                "a1": "Use a strong password"
            },
            {
                "a2": "Share your home address"
            },
            {
                "a3": "Post your phone number"
            },
            {
                "a4": "Show your birth date"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct! Using a strong password is a simple way to protect your personal information on social media. It is recommended to use a long password with a combination of upper and lowercase letters, numbers, and symbols."
            },
            {
                "a2": "Incorrect. Sharing your home address can lead to invasion of your privacy."
            },
            {
                "a3": "Incorrect. Posting your phone number can make you vulnerable to spam messages and calls."
            },
            {
                "a4": "Incorrect. Showing your birth date is a bad idea since it is a crucial piece of information needed for identity theft."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Email Safety",
        "level": "intermediate",
        "question": "What is the best way to verify if an email is authentic?",
        "answers": [
            {
                "a1": "Click on any links provided in the email."
            },
            {
                "a2": "Check the sender's email address and compare it to previous emails from the same sender."
            },
            {
                "a3": "Reply to the email and ask for confirmation."
            },
            {
                "a4": "Ignore the email and delete it."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Clicking on links in suspicious emails can lead to malware infections or other security issues."
            },
            {
                "a2": "Correct. Checking the sender's email address and comparing it to previous emails from the same sender can help verify if an email is authentic or if it is a phishing scam using a spoofed email address."
            },
            {
                "a3": "Incorrect. Replying to a suspicious email is not recommended as it can confirm to attackers that they have reached a valid email address."
            },
            {
                "a4": "Incorrect. Ignoring suspicious emails and deleting them is a good practice, but it does not help verify if they are authentic."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Credential Stuffing",
        "level": "intermediate",
        "question": "What is the best way to protect against credential stuffing attacks?",
        "answers": [
            {
                "a": "Reuse the same password across multiple accounts to make it less likely to forget."
            },
            {
                "b": "Use unique and strong passwords for each account."
            },
            {
                "c": "Share your login credentials with trusted friends to make sure you never get locked out."
            },
            {
                "d": "Disable two-factor authentication to make the login process faster and more convenient."
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Reusing the same password across multiple accounts is a bad idea and makes it easier for hackers to gain access to your personal information."
            },
            {
                "b": "Correct. Using unique and strong passwords for each account is the best way to protect against credential stuffing attacks. It is also important to use effective password management and two-factor authentication."
            },
            {
                "c": "Incorrect. Sharing your login credentials with anyone, even trusted friends, is very risky and increases the likelihood of a data breach."
            },
            {
                "d": "Incorrect. Two-factor authentication adds an extra layer of security to your accounts and should not be disabled."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Physical Safety",
        "level": "expert",
        "question": "What are the potential consequences of not reporting unsafe conditions in the workplace?",
        "answers": [
            {
                "a": "Accidents and injuries"
            },
            {
                "b": "Fines and penalties"
            },
            {
                "c": "Harm to environment"
            },
            {
                "d": "All of the above"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Correct! Not reporting unsafe conditions in the workplace can lead to accidents and injuries, in addition to fines and penalties for non-compliance. Also, it can harm the environment leading to loss and damage of property."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Information Security",
        "level": "beginner",
        "question": "What is information security?",
        "answers": [
            {
                "a": "The protection of sensitive data from unauthorized access or modification."
            },
            {
                "b": "The sharing of sensitive data with other organizations."
            },
            {
                "c": "The destruction of sensitive data to prevent unauthorized access."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Information security involves protecting data from unauthorized access or modification."
            },
            {
                "b": "Incorrect. Sharing sensitive data could lead to unauthorized access or modification."
            },
            {
                "c": "Incorrect. Destroying data may not always be the best way to protect it."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Errors, Logging and Auditing Architecture",
        "level": "expert",
        "question": "What is the difference between logging and auditing in Errors, Logging, and Auditing Architecture?",
        "answers": [
            {
                "a": "Logging helps to identify system failures, while auditing helps to maintain regulatory compliance."
            },
            {
                "b": "Logging records all system events, while auditing identifies suspicious activity."
            },
            {
                "c": "Logging is automated and passive, while auditing is manual and reactive."
            },
            {
                "d": "Logging is used for real-time monitoring, while auditing is used for post-incident analysis."
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Both logging and auditing help to identify system failures and maintain regulatory compliance."
            },
            {
                "b": "Correct. Logging records all system events, while auditing sifts through that data to identify suspicious activity."
            },
            {
                "c": "Incorrect. Both logging and auditing can be automated and proactive, or manual and reactive."
            },
            {
                "d": "Incorrect. Both logging and auditing can be used for real-time monitoring and post-incident analysis."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Internet Safety",
        "level": "intermediate",
        "question": "Which of these methods can help prevent cyberbullying?",
        "answers": [
            {
                "a1": "Reporting cyberbullying to the authorities."
            },
            {
                "a2": "Learning about safe internet practices."
            },
            {
                "a3": "Blocking the bully and using privacy settings."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Reporting to the authorities may or may not be effective."
            },
            {
                "a2": "Incorrect. Learning about safe internet practices can help with overall internet safety but may not prevent cyberbullying."
            },
            {
                "a3": "Correct. Blocking the bully and using privacy settings can help prevent cyberbullying and protect personal information."
            },
            {
                "a4": "Correct. All of the above methods can help prevent cyberbullying."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Fail secure - Fail safe",
        "level": "intermediate",
        "question": "Which approach may be more appropriate in scenarios where physical safety is more important than security, such as a hospital or a theater?",
        "answers": [
            {
                "a1": "Fail secure"
            },
            {
                "a2": "Fail safe"
            },
            {
                "a3": "Both approaches are equally appropriate"
            },
            {
                "a4": "Neither approach is appropriate in this situation"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Fail secure prioritizes security over physical safety, which is not suitable for all scenarios."
            },
            {
                "a2": "Correct. Fail safe ensures that people can quickly exit the building in an emergency, making it more appropriate in situations where physical safety is of utmost importance."
            },
            {
                "a3": "Incorrect. Each approach has its own benefits, but in certain situations, one may be more appropriate than the other."
            },
            {
                "a4": "Incorrect. Fail secure and fail safe are both applicable in security systems and must be considered in the design process."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Identity Theft Prevention",
        "level": "expert",
        "question": "How can you tell if your identity has been stolen?",
        "answers": [
            {
                "a1": "You receive unexpected bills or collections notices"
            },
            {
                "a2": "Your bank account suddenly shows unauthorized transactions"
            },
            {
                "a3": "You are denied credit or receive a much higher interest rate than usual"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Receiving unexpected bills or collections notices for accounts you did not open can indicate that your identity has been stolen."
            },
            {
                "a2": "Correct. Seeing unauthorized transactions on your bank account is a clear indication that your identity has been compromised."
            },
            {
                "a3": "Correct. Being denied credit or receiving a much higher interest rate than usual can be a sign of identity theft that has affected your credit history."
            },
            {
                "a4": "Correct. All of these scenarios are common indicators of identity theft and should be taken seriously."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Avoiding Ransomware",
        "level": "advanced",
        "question": "What is \"double extortion\" in the context of ransomware attacks?",
        "answers": [
            {
                "a1": "A type of encryption algorithm used by ransomware creators"
            },
            {
                "a2": "A tactic used by criminals to demand two separate ransom payments"
            },
            {
                "a3": "A way for ransomware creators to upload stolen data to a remote server before encrypting it"
            },
            {
                "a4": "A term used to describe ransomware attacks that target both individuals and organizations"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Double extortion does not refer to an encryption algorithm used by ransomware creators."
            },
            {
                "a2": "Incorrect. Double extortion refers to a single ransom payment demanded under threat of publishing stolen data, as opposed to demanding a separate payment for not publishing the data."
            },
            {
                "a3": "Correct. Double extortion occurs when ransomware creators not only encrypt a victim's data, but also upload copies of the data to a remote server before encrypting it. This allows them to demand payment for both the decryption key and the return of the stolen data."
            },
            {
                "a4": "Incorrect. \"Double extortion\" does not refer to a specific target of ransomware attacks."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Data Protection and Privacy Architecture",
        "level": "beginner",
        "question": "What is Data Protection and Privacy Architecture used for?",
        "answers": [
            {
                "a": "Helping organizations achieve cybersecurity certification"
            },
            {
                "b": "Building effective measures to safeguard sensitive information from unauthorized access and ensuring compliance with data protection and privacy regulations"
            },
            {
                "c": "Implementing IT frameworks only"
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Cybersecurity certification relates to overall security management and focuses only on technical safeguards."
            },
            {
                "b": "Correct. Data Protection and Privacy Architecture involves designing and implementing technical and organizational frameworks to safeguard sensitive information from unauthorized access, ensuring compliance with data protection and privacy regulations, and maintaining trust with clients."
            },
            {
                "c": "Incorrect. Data Protection and Privacy Architecture includes both technical and organizational controls."
            }
        ]
    },
    {
        "topic": "General",
        "category": "CEO Fraud",
        "level": "beginner",
        "question": "What is CEO fraud?",
        "answers": [
            {
                "a1": "A scam where cybercriminals impersonate a CEO or executive of a company to manipulate employees into making financial transactions or divulging sensitive information."
            },
            {
                "a2": "A scam where cybercriminals impersonate a customer to manipulate employees into making financial transactions or divulging sensitive information."
            },
            {
                "a3": "A scam where cybercriminals impersonate a government official to manipulate employees into making financial transactions or divulging sensitive information."
            },
            {
                "a4": "A scam where cybercriminals impersonate a co-worker to manipulate employees into making financial transactions or divulging sensitive information."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. CEO fraud is a scam in which cybercriminals impersonate a CEO or executive of a company to manipulate employees into making financial transactions or divulging sensitive information."
            },
            {
                "a2": "Incorrect. This is not the correct definition of CEO fraud."
            },
            {
                "a3": "Incorrect. This is not the correct definition of CEO fraud."
            },
            {
                "a4": "Incorrect. This is not the correct definition of CEO fraud."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Security logging and monitoring",
        "level": "beginner",
        "question": "What is the purpose of security logging and monitoring?",
        "answers": [
            {
                "a1": "To track and analyze user activities"
            },
            {
                "a2": "To protect data from physical damage"
            },
            {
                "a3": "To manage server updates"
            },
            {
                "a4": "To optimize network speed"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Security logging and monitoring involves tracking and analyzing user activities to detect and respond to potential threats."
            },
            {
                "a2": "Incorrect. While data protection is essential to security, the purpose of security logging and monitoring is to track and analyze user activities."
            },
            {
                "a3": "Incorrect. Server updates are important, but not the main purpose of security logging and monitoring."
            },
            {
                "a4": "Incorrect. While network speed optimization is important, it is not the main purpose of security logging and monitoring."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Information Security",
        "level": "expert",
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "answers": [
            {
                "a": "Symmetric encryption uses the same key for encryption and decryption, while asymmetric encryption uses different keys."
            },
            {
                "b": "Symmetric encryption is more secure than asymmetric encryption."
            },
            {
                "c": "Asymmetric encryption is faster than symmetric encryption."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Symmetric encryption uses the same key for encryption and decryption, while asymmetric encryption uses different keys."
            },
            {
                "b": "Incorrect. The security of encryption depends on the algorithm and key length used, not whether it is symmetric or asymmetric."
            },
            {
                "c": "Incorrect. Asymmetric encryption is generally slower than symmetric encryption due to the complexity of the key exchange process."
            },
            {
                "d": "Incorrect. Only option A is correct; options B and C are incorrect."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Supply Chain Vulnerabilities",
        "level": "advanced",
        "question": "What are some proactive strategies that companies can use to mitigate supply chain vulnerabilities?",
        "answers": [
            {
                "a1": "Contingency planning"
            },
            {
                "a2": "Supplier risk assessments"
            },
            {
                "a3": "Regular inventory audits"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Contingency planning can help companies prepare for potential disruptions in the supply chain."
            },
            {
                "a2": "Correct. Supplier risk assessments can help companies identify potential risks and take steps to address them."
            },
            {
                "a3": "Incorrect. Regular inventory audits can help companies identify inventory discrepancies, but they are not a proactive strategy to mitigate supply chain vulnerabilities."
            },
            {
                "a4": "Correct. Contingency planning, supplier risk assessments, and other proactive strategies can help companies mitigate supply chain vulnerabilities."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Incident Response",
        "level": "expert",
        "question": "What is the role of threat intelligence in incident response?",
        "answers": [
            {
                "a1": "To provide real-time alerts on potential security threats and vulnerabilities."
            },
            {
                "a2": "To enrich the incident data with contextual information, such as the motivations and tactics of the attackers."
            },
            {
                "a3": "To identify the source of the incident and the vulnerabilities that were exploited."
            },
            {
                "a4": "To assist in the containment and eradication of the incident by providing actionable insights and recommendations."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. While threat intelligence can provide alerts on potential security threats and vulnerabilities, this is not its primary role in incident response."
            },
            {
                "a2": "Correct. Threat intelligence can help incident responders better understand the nature and scope of the incident, as well as the motivations and tactics of the attackers. This can lead to better containment and eradication of the incident and more effective prevention of future incidents."
            },
            {
                "a3": "Incorrect. Identifying the source and vulnerabilities of the incident is an important part of incident response, but threat intelligence is not the primary tool for this task."
            },
            {
                "a4": "Incorrect. While threat intelligence can provide actionable insights and recommendations, its role in incident response is broader than just containment and eradication. Threat intelligence can also help with situational awareness, incident reporting, and risk assessment."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Business Logic Architecture",
        "level": "advanced",
        "question": "What is the role of policies in Business Logic Architecture?",
        "answers": [
            {
                "a1": "Policies define the technical specifications of the software system."
            },
            {
                "a2": "Policies guide the behavior and actions of the software system."
            },
            {
                "a3": "Policies ensure data security and privacy."
            },
            {
                "a4": "Policies enforce ethical considerations in software development."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Policies do not define the technical specifications of the software system."
            },
            {
                "a2": "Correct. Policies guide the behavior and actions of the software system by providing a framework for decision-making and outlining the rules that the system must follow."
            },
            {
                "a3": "Incorrect. Policies may ensure data security and privacy, but this is not their primary role in Business Logic Architecture."
            },
            {
                "a4": "Incorrect. Policies may enforce ethical considerations in software development, but this is not their primary role in Business Logic Architecture."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Complete Mediation",
        "level": "intermediate",
        "question": "Which type of building is Complete Mediation often used in?",
        "answers": [
            {
                "a1": "Public Libraries"
            },
            {
                "a2": "Outdoor Plazas"
            },
            {
                "a3": "Museums"
            },
            {
                "a4": "Convenience stores"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Complete Mediation is often used in large public buildings, but typically not in Public Libraries."
            },
            {
                "a2": "Incorrect. Although Complete Mediation can be used in outdoor spaces, it is often used in indoor public buildings."
            },
            {
                "a3": "Correct. Complete Mediation is often used in buildings such as Museums, Government Centers, and other large public spaces."
            },
            {
                "a4": "Incorrect. Convenience stores are much too small to employ the use of Complete Mediation."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Supply Chain Vulnerabilities",
        "level": "intermediate",
        "question": "What are some factors that can lead to supply chain vulnerabilities?",
        "answers": [
            {
                "a1": "Poor inventory management"
            },
            {
                "a2": "Natural disasters"
            },
            {
                "a3": "Theft"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Poor inventory management is one of the factors that can lead to supply chain vulnerabilities."
            },
            {
                "a2": "Correct. Natural disasters can impact the supply chain and cause disruptions."
            },
            {
                "a3": "Correct. Theft can lead to a loss of inventory and revenue in the supply chain."
            },
            {
                "a4": "Correct. Poor inventory management, natural disasters, theft, and cyber threats are all factors that can lead to supply chain vulnerabilities."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Privacy",
        "level": "expert",
        "question": "What is steganography and how is it used for privacy purposes?",
        "answers": [
            {
                "a1": "A type of encryption method that uses complex algorithms to secure data."
            },
            {
                "a2": "A technique for hiding secret information within non-secret information, such as images or audio files."
            },
            {
                "a3": "The process of obscuring digital data, making it difficult for hackers to access."
            },
            {
                "a4": "A system that automatically deletes sensitive information from a device after a certain period of time."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Encryption is a different technique that involves encoding information to prevent unauthorized access or modification."
            },
            {
                "a2": "Correct. Steganography is a technique of hiding secret information within non-secret information, such as images or audio files. This allows for confidential data to be transmitted or stored, while appearing as innocuous data to outside parties."
            },
            {
                "a3": "Incorrect. Obscuring digital data may provide some level of privacy, but it does not necessarily involve steganography."
            },
            {
                "a4": "Incorrect. Automatic deletion of sensitive information after a period of time may provide some privacy protection, but it is not related to steganography."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Password Security",
        "level": "beginner",
        "question": "What is a characteristic of a strong password?",
        "answers": [
            {
                "a1": "It is easy to guess."
            },
            {
                "a2": "It is a combination of uppercase and lowercase letters, numbers, and symbols."
            },
            {
                "a3": "It is the same for multiple accounts."
            },
            {
                "a4": "It is shared with others."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. A strong password should not be easy to guess."
            },
            {
                "a2": "Correct. A strong password should be complex with a mix of uppercase, lowercase, numbers and symbols."
            },
            {
                "a3": "Incorrect. A strong password should not be reused across accounts."
            },
            {
                "a4": "Incorrect. It is important to avoid sharing passwords with others."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Session Management Architecture",
        "level": "advanced",
        "question": "How can session hijacking be prevented?",
        "answers": [
            {
                "a1": "Using SSL/TLS encryption"
            },
            {
                "a2": "Implementing secure cookie settings"
            },
            {
                "a3": "Using session tokens to identify users"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. While SSL/TLS encryption can prevent some forms of session hijacking, it is not a complete solution."
            },
            {
                "a2": "Partially correct. Secure cookie settings can help prevent session hijacking but may not be enough on their own."
            },
            {
                "a3": "Partially correct. Session tokens are one tool used to prevent session hijacking but are not the only solution."
            },
            {
                "a4": "Correct. Using a combination of SSL/TLS encryption, secure cookie settings, and session tokens can provide a more comprehensive approach to preventing session hijacking."
            }
        ]
    },
    {
        "topic": "Testing",
        "category": "Foundations for Software Testing",
        "level": "advanced",
        "question": "What is a boundary value analysis?",
        "answers": [
            {
                "a1": "It is a technique for finding errors in software systems by testing input and output values that lie on the edges or outside of input domain boundaries."
            },
            {
                "a2": "It is a technique for finding errors in software systems by testing random input and output values that have never been tested before."
            },
            {
                "a3": "It is a technique for finding errors in software systems by testing input and output values that are commonly used by end-users."
            },
            {
                "a4": "It is a technique for finding errors in software systems by testing input and output values that are frequently updated by developers."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Boundary value analysis is a technique for finding errors in software systems by testing input and output values that lie on the edges or outside of input domain boundaries."
            },
            {
                "a2": "Incorrect. Random testing is a technique for finding errors in software systems by testing random input and output values that have never been tested before."
            },
            {
                "a3": "Incorrect. User-based testing is a technique for finding errors in software systems by testing input and output values that are commonly used by end-users."
            },
            {
                "a4": "Incorrect. Testing frequently updated input and output values does not guarantee the discovery of errors in software systems."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Social Engineering",
        "level": "advanced",
        "question": "What is the difference between phishing and spear-phishing?",
        "answers": [
            {
                "a1": "Phishing is a broad term used to refer to any attempt to acquire sensitive information through email or other digital communication, while spear-phishing is a more targeted attack aimed at a specific individual or organization."
            },
            {
                "a2": "Phishing is a more sophisticated attack that uses several methods to gain access to sensitive information, while spear-phishing is a simple email-based attack."
            },
            {
                "a3": "Phishing is a form of social engineering that targets individuals, while spear-phishing targets only organizations."
            },
            {
                "a4": "There is no difference between phishing and spear-phishing."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Phishing is a broad term used to refer to any attempt to acquire sensitive information through email or other digital communication, while spear-phishing is a more targeted attack aimed at a specific individual or organization."
            },
            {
                "a2": "Incorrect. Spear-phishing is a more sophisticated attack that involves extensive research on the target to personalize the message and increase the chances of success."
            },
            {
                "a3": "Incorrect. Both phishing and spear-phishing can target individuals or organizations."
            },
            {
                "a4": "Incorrect. Spear-phishing is a subset of phishing that is more targeted and personalized."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Source code management (SCM)",
        "level": "expert",
        "question": "What is a \"commit\" in SCM?",
        "answers": [
            {
                "a1": "A review process for code changes"
            },
            {
                "a2": "A way to approve a proposed change"
            },
            {
                "a3": "A record of changes to the codebase"
            },
            {
                "a4": "A unit of code that is executable by the computer"
            }
        ],
        "correct_answer": [
            "a3"
        ],
        "explanations": [
            {
                "a1": "Incorrect. A review process is typically separate from committing changes to the codebase."
            },
            {
                "a2": "Incorrect. Approval is usually a separate process from committing changes to the codebase."
            },
            {
                "a3": "Correct. A commit is a record of changes that have been made to the codebase. Each commit includes a message explaining the changes."
            },
            {
                "a4": "Incorrect. A unit of executable code is known as a binary or executable."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Configuration Architecture",
        "level": "beginner",
        "question": "What does configuration architecture refer to?",
        "answers": [
            {
                "a1": "The process of designing, implementing and managing software or system configurations that meet specific functional requirements."
            },
            {
                "a2": "The process of randomly configuring hardware and software."
            },
            {
                "a3": "The process of optimizing system performance using various configurations."
            },
            {
                "a4": "The process of deleting system configurations to improve speed."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Configuration Architecture refers to the process of designing, implementing and managing software or system configurations that meet specific functional requirements."
            },
            {
                "a2": "Incorrect. Configuration architecture is not random configuration of hardware and software."
            },
            {
                "a3": "Incorrect. Configuration Architecture is not just optimizing system performance."
            },
            {
                "a4": "Incorrect. Configuration Architecture is not deleting system configurations to improve speed."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Security requirements",
        "level": "expert",
        "question": "What is the difference between confidentiality, integrity, and availability as they relate to security requirements?",
        "answers": [
            {
                "a1": "Confidentiality ensures that data is accessed only by authorized individuals or systems, integrity ensures that data is accurate and not tampered with, and availability ensures that data is accessible when needed."
            },
            {
                "a2": "Confidentiality ensures that data is backed up in multiple locations, integrity ensures that data can be recovered if lost, and availability ensures that data can be restored quickly in the event of an outage."
            },
            {
                "a3": "Confidentiality ensures that data is encrypted during transmission and storage, integrity ensures that data is kept up to date, and availability ensures that data can be accessed remotely."
            },
            {
                "a4": "Confidentiality ensures that data is available to anyone who needs it, integrity ensures that data is stored in a secure location, and availability ensures that data is always up to date."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct - Confidentiality, integrity, and availability are often referred to as the CIA triad of security requirements, where confidentiality ensures only authorized access, integrity ensures accuracy and completeness, and availability ensures accessibility when needed."
            },
            {
                "a2": "Incorrect - Confidentiality does not necessarily ensure that data is backed up in multiple locations. While availability does relate to quick restoration after an outage, this is not its only purpose."
            },
            {
                "a3": "Incorrect - Confidentiality is not just about encryption, but about access control as well. Integrity is about maintaining data accuracy, not just keeping it up to date. Availability is not just about remote access, but also local access."
            },
            {
                "a4": "Incorrect - Confidentiality does not mean making data available to anyone who needs it, but instead limiting access to authorized individuals or systems. Integrity refers to accurate data, not just secure storage. Availability does not ensure that data is always up to date."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Open design",
        "level": "advanced",
        "question": "What role does technology play in open design?",
        "answers": [
            {
                "a": "Allows for remote collaboration."
            },
            {
                "b": "Facilitates the sharing of design ideas and plans."
            },
            {
                "c": "Enables fast and efficient communication."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Correct. Technology allows for remote collaboration, making it possible for individuals from different locations to participate in open design projects."
            },
            {
                "b": "Correct. Technology enables the sharing of design ideas and plans, making it easier to collaborate and build on existing ideas."
            },
            {
                "c": "Correct. Technology enables fast and efficient communication, ensuring that stakeholders can provide feedback and receive updates in real-time."
            },
            {
                "d": "Correct. All of the options are ways in which technology plays a role in open design."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Secret scanning tools",
        "level": "advanced",
        "question": "Which of the following types of data can secret scanning tools identify?",
        "answers": [
            {
                "a1": "Credit card numbers"
            },
            {
                "a2": "Personal identification numbers (PINs)"
            },
            {
                "a3": "Social security numbers"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct! Secret scanning tools can identify credit card numbers, along with other sensitive information like social security numbers and PINs."
            },
            {
                "a2": "Correct! Secret scanning tools can identify personal identification numbers (PINs), along with other sensitive information like social security numbers and credit card numbers."
            },
            {
                "a3": "Correct! Secret scanning tools can identify social security numbers, along with other sensitive information like credit card numbers and PINs."
            },
            {
                "a4": "Correct! Secret scanning tools are designed to search for and identify various types of sensitive information, including credit card numbers, social security numbers, and PINs."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Secure Software Development Lifecycle",
        "level": "beginner",
        "question": "What does SSDL stand for?",
        "answers": [
            {
                "a1": "Software System Development Lifecycle"
            },
            {
                "a2": "Safety System Development Lifecycle"
            },
            {
                "a3": "Secure Software Development Lifecycle"
            },
            {
                "a4": "Software Security Development Lifecycle"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. SSDL stands for Secure Software Development Lifecycle."
            },
            {
                "a2": "Incorrect. SSDL stands for Secure Software Development Lifecycle."
            },
            {
                "a3": "Correct! SSDL stands for Secure Software Development Lifecycle."
            },
            {
                "a4": "Incorrect. SSDL stands for Secure Software Development Lifecycle."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Psychological acceptability",
        "level": "intermediate",
        "question": "Which factors are important to achieve psychological acceptability?",
        "answers": [
            {
                "a1": "Layout, accessibility, and energy efficiency"
            },
            {
                "a2": "Lighting, color, and materials"
            },
            {
                "a3": "Furniture, room temperature, and air quality"
            },
            {
                "a4": "Security, noise control, and parking availability"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Partially correct. While layout and accessibility are important, energy efficiency is not directly related to achieving psychological acceptability."
            },
            {
                "a2": "Correct. Achieving psychological acceptability requires careful consideration of factors such as lighting, color, and materials."
            },
            {
                "a3": "Partially correct. Furniture and room temperature can play a role, but air quality is not directly related to psychological acceptability."
            },
            {
                "a4": "Partially correct. Security and noise control can contribute to psychological acceptability, but parking availability is not directly related."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Psychological acceptability",
        "level": "advanced",
        "question": "Which color has been linked to improving focus and creativity?",
        "answers": [
            {
                "a1": "Red"
            },
            {
                "a2": "Blue"
            },
            {
                "a3": "Green"
            },
            {
                "a4": "Yellow"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Red has been linked to increased arousal and excitement, not necessarily focus and creativity."
            },
            {
                "a2": "Incorrect. Blue has been linked to calming and relaxation, not necessarily focus and creativity."
            },
            {
                "a3": "Correct. Green has been linked to improved focus and creativity, as well as reduced stress and anxiety."
            },
            {
                "a4": "Incorrect. Yellow has been linked to increased energy and warmth, not necessarily focus and creativity."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "PASTA",
        "level": "beginner",
        "question": "What does PASTA stand for?",
        "answers": [
            {
                "a1": "Process for Attack Simulation and Threat Analysis"
            },
            {
                "a2": "Process for Security Analysis and Threat Assessment"
            },
            {
                "a3": "Process for Securing Access and Technology Architecture"
            },
            {
                "a4": "Process for Testing Application Security and Authentication"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. PASTA stands for Process for Attack Simulation and Threat Analysis."
            },
            {
                "a2": "Incorrect. PASTA does not stand for Process for Security Analysis and Threat Assessment."
            },
            {
                "a3": "Incorrect. PASTA does not stand for Process for Securing Access and Technology Architecture."
            },
            {
                "a4": "Incorrect. PASTA does not stand for Process for Testing Application Security and Authentication."
            }
        ]
    },
    {
        "topic": "Testing",
        "category": "Foundations for Software Testing",
        "level": "beginner",
        "question": "What is the purpose of software testing?",
        "answers": [
            {
                "a1": "To ensure that software products and applications are tested thoroughly for bugs, defects, and errors"
            },
            {
                "a2": "To develop software products and applications with new features"
            },
            {
                "a3": "To market software products and applications to end-users"
            },
            {
                "a4": "To create documentation for software products and applications"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Software testing is done to ensure that software products and applications are tested thoroughly for bugs, defects, and errors."
            },
            {
                "a2": "Incorrect. Software development is done to develop software products and applications with new features."
            },
            {
                "a3": "Incorrect. Marketing is done to promote software products and applications to end-users."
            },
            {
                "a4": "Incorrect. Documentation is done to create user manuals or guides for software products and applications."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Keeping your Devices Secure",
        "level": "advanced",
        "question": "What is a common way that hackers gain access to a device?",
        "answers": [
            {
                "a1": "By physically stealing the device"
            },
            {
                "a2": "By guessing the password"
            },
            {
                "a3": "By exploiting a vulnerability in the software"
            },
            {
                "a4": "By placing a virus on the device through a malicious email attachment"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Physical theft can be a risk, but it is not the most common way hackers gain access."
            },
            {
                "a2": "Incorrect. Most devices have measures in place to prevent password guessing, such as locking the account after multiple failed attempts."
            },
            {
                "a3": "Correct. Hackers frequently exploit vulnerabilities in software to gain access to a device."
            },
            {
                "a4": "Incorrect. While email attachments can be a delivery method for viruses, they are not the most common way hackers gain access."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Static Application Security Testing (SAST)",
        "level": "expert",
        "question": "What are some common types of vulnerabilities SAST tools can identify in source code?",
        "answers": [
            {
                "a1": "SQL injection, Cross-Site Scripting (XSS), and buffer overflow vulnerabilities"
            },
            {
                "a2": "Cross-Site Request Forgery (CSRF), Remote Code Execution (RCE), and OAuth vulnerabilities"
            },
            {
                "a3": "Distributed Denial of Service (DDoS), Man-in-the-Middle (MitM), and DNS Spoofing vulnerabilities"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. SQL injection, Cross-Site Scripting (XSS), and buffer overflow vulnerabilities are among the most common types of security risks that SAST tools can identify in source code."
            },
            {
                "a2": "Incorrect. While CSRF, RCE, and OAuth vulnerabilities are common, they are not typically found by SAST tools."
            },
            {
                "a3": "Incorrect. DDoS, MitM, and DNS Spoofing vulnerabilities are network-level attacks and are not generally identified by SAST tools."
            },
            {
                "a4": "Incorrect. While SAST tools may identify other types of vulnerabilities, the ones listed in answer a1 are the most common types found in source code."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Access Control Architecture",
        "level": "advanced",
        "question": "What are the different types of access control models?",
        "answers": [
            {
                "a": "Discretionary Access Control (DAC), Mandatory Access Control (MAC), Role-Based Access Control (RBAC), and Attribute-Based Access Control (ABAC)."
            },
            {
                "b": "Biometric Access Control, Token-Based Access Control, Password-Based Access Control, and Role-Based Access Control."
            },
            {
                "c": "Network Access Control, Wired Access Control, Wireless Access Control, and Remote Access Control."
            },
            {
                "d": "None of the above."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. The four main types of access control models are Discretionary Access Control (DAC), Mandatory Access Control (MAC), Role-Based Access Control (RBAC), and Attribute-Based Access Control (ABAC)."
            },
            {
                "b": "Incorrect. This option lists different types of authentication methods, not access control models."
            },
            {
                "c": "Incorrect. This option lists network access control types, not access control models."
            },
            {
                "d": "Incorrect. The correct option is a."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Open-Source Intelligence (OSINT)",
        "level": "advanced",
        "question": "What are some examples of publicly available sources used in OSINT?",
        "answers": [
            {
                "a1": "Social media platforms such as Facebook, Twitter, and LinkedIn."
            },
            {
                "a2": "News articles and other online or offline platforms."
            },
            {
                "a3": "Public databases such as government records."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Social media platforms such as Facebook, Twitter, and LinkedIn are some examples of publicly available sources used in OSINT."
            },
            {
                "a2": "Correct. News articles and other online or offline platforms are some examples of publicly available sources used in OSINT."
            },
            {
                "a3": "Correct. Public databases such as government records are some examples of publicly available sources used in OSINT."
            },
            {
                "a4": "Correct. All of the above are examples of publicly available sources used in OSINT."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Safety when Working from Home",
        "level": "beginner",
        "question": "What should you do to reduce the chance of falling or straining your eyes while working from home?",
        "answers": [
            {
                "a1": "Use proper lighting"
            },
            {
                "a2": "Keep the curtains drawn"
            },
            {
                "a3": "Turn off all lights"
            },
            {
                "a4": "Do not use a computer"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Proper lighting reduces the chance of falling or straining your eyes while working from home."
            },
            {
                "a2": "Incorrect. Keeping the curtains drawn does not help in reducing the chance of falling or straining your eyes while working from home."
            },
            {
                "a3": "Incorrect. Turning off all lights would not help in reducing the chance of falling or straining your eyes while working from home."
            },
            {
                "a4": "Incorrect. Not using a computer is not a solution. The question is about how to reduce the chances of falling or straining your eyes while working from home."
            }
        ]
    },
    {
        "topic": "Access Control",
        "category": "RBAC vs ABAC vs ReBAC",
        "level": "expert",
        "question": "What are some factors that an organization should consider when choosing between RBAC, ABAC, and ReBAC?",
        "answers": [
            {
                "a1": "The complexity of the environment and the need for fine-grained access control."
            },
            {
                "a2": "The size of the organization and the budget available for implementation."
            },
            {
                "a3": "The skill level of the workforce and the number of access requests."
            },
            {
                "a4": "The type of data or system being protected and the regulatory compliance requirements."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Partially correct. An organization should consider the complexity of the environment and the need for fine-grained access control, but this is not the only factor to consider."
            },
            {
                "a2": "Incorrect. The size of the organization and budget are important factors to consider, but not the only ones."
            },
            {
                "a3": "Incorrect. The skill level of the workforce and the number of access requests could be factors to consider, but not as germane as the other answer options."
            },
            {
                "a4": "Correct. An organization should consider factors like the type of data or system being protected and the regulatory compliance requirements, such as HIPAA or GDPR."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Configuration Architecture",
        "level": "advanced",
        "question": "What are the three main components of configuration architecture?",
        "answers": [
            {
                "a1": "Hardware, Software, and Network"
            },
            {
                "a2": "System, User Interface, and Database"
            },
            {
                "a3": "Security, Performance, and Usability"
            },
            {
                "a4": "Relationships, Dependencies, and Connectivity"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Hardware, software, and network are important components, but not the main components of configuration architecture."
            },
            {
                "a2": "Incorrect. System, user interface, and database are important components, but not the main components of configuration architecture."
            },
            {
                "a3": "Incorrect. Security, performance, and usability are important factors to consider but they are not components of configuration architecture."
            },
            {
                "a4": "Correct. Configuration architecture involves defining the relationships and dependencies between system components, configuring hardware and software, and establishing connectivity between different components."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Information Security",
        "level": "intermediate",
        "question": "What is the purpose of security awareness training?",
        "answers": [
            {
                "a": "To help individuals identify potential threats."
            },
            {
                "b": "To promote secure practices."
            },
            {
                "c": "To minimize the risk of data breaches."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Correct. Security awareness training helps individuals identify potential threats such as phishing emails or malware."
            },
            {
                "b": "Correct. Security awareness training promotes secure practices that can help minimize the risk of data breaches."
            },
            {
                "c": "Correct. Security awareness training can help minimize the risk of data breaches."
            },
            {
                "d": "Correct. Security awareness training helps individuals identify potential threats, promotes secure practices, and minimizes the risk of data breaches."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Social Engineering",
        "level": "intermediate",
        "question": "What emotion does Social Engineering often play on?",
        "answers": [
            {
                "a1": "Joy."
            },
            {
                "a2": "Fear."
            },
            {
                "a3": "Anger."
            },
            {
                "a4": "Sadness."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Joy is not typically used in Social Engineering attacks."
            },
            {
                "a2": "Correct. Fear, trust, or greed are common emotions that Social Engineering attacks play on."
            },
            {
                "a3": "Incorrect. While anger can be used in some cases, it is not as common as fear, trust, or greed."
            },
            {
                "a4": "Incorrect. Sadness is not typically used in Social Engineering attacks."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Microservice Architectures",
        "level": "intermediate",
        "question": "What is the main advantage of using a microservice architecture?",
        "answers": [
            {
                "a1": "Improved scalability of the system"
            },
            {
                "a2": "Elimination of code complexity"
            },
            {
                "a3": "Better performance of the system"
            },
            {
                "a4": "Reduced development time"
            }
        ],
        "correct_answer": [
            "a1"
        ],
        "explanations": [
            {
                "a1": "Correct. The microservice architecture approach makes it possible for individual parts of an application's functionality to scale up or down based on demand, thereby making it more scalable."
            },
            {
                "a2": "Incorrect. Microservices break down the code into smaller, less complex components, but this does not eliminate code complexity entirely."
            },
            {
                "a3": "Incorrect. While performance may be better in certain cases, scalability is the main advantage."
            },
            {
                "a4": "Incorrect. Although independent services may be available for deployment, development of a microservice architecture typically takes longer to complete."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Authentication Architecture",
        "level": "beginner",
        "question": "What is Authentication Architecture?",
        "answers": [
            {
                "a1": "A process of compromising network security"
            },
            {
                "a2": "A process of verifying user identity in a network or system"
            },
            {
                "a3": "A process of sharing passwords with others"
            },
            {
                "a4": "A process of browsing internet without logging in"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Authentication Architecture ensures network security, it does not compromise it."
            },
            {
                "a2": "Correct. Authentication Architecture is a process of verifying user identity in a network or system."
            },
            {
                "a3": "Incorrect. Password sharing can lead to unauthorized access, which Authentication Architecture aims to prevent."
            },
            {
                "a4": "Incorrect. Browsing the internet without logging in does not involve Authentication Architecture."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Software composition analysis (SCA)",
        "level": "beginner",
        "question": "What does SCA stand for?",
        "answers": [
            {
                "a1": "Software Creation Analysis"
            },
            {
                "a2": "Software Composition Analysis"
            },
            {
                "a3": "Software Collaboration Analysis"
            },
            {
                "a4": "Software Communication Analysis"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. SCA stands for Software Composition Analysis, not Software Creation Analysis."
            },
            {
                "a2": "Correct. SCA stands for Software Composition Analysis, which is a tool used to identify, track and manage third-party software components to ensure compliance, security and maintainability."
            },
            {
                "a3": "Incorrect. SCA stands for Software Composition Analysis, not Software Collaboration Analysis."
            },
            {
                "a4": "Incorrect. SCA stands for Software Composition Analysis, not Software Communication Analysis."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Vishing (Voice Phishing)",
        "level": "advanced",
        "question": "What is the best way to verify a caller's identity during a vishing attack?",
        "answers": [
            {
                "a1": "Call back the number on your caller ID."
            },
            {
                "a2": "Ask for a reference number and call the organization to verify it."
            },
            {
                "a3": "Ask the caller to provide sensitive information to prove their identity."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. While calling back the number on your caller ID can help verify the caller's identity, it is not foolproof as fraudsters can spoof caller ID information."
            },
            {
                "a2": "Correct. Asking for a reference number and calling the organization to verify it is the best way to verify a caller's identity during a vishing attack."
            },
            {
                "a3": "Incorrect. Asking the caller to provide sensitive information to prove their identity is not recommended, as this could be a tactic used by fraudsters to trick you into divulging sensitive information."
            },
            {
                "a4": "Incorrect. While calling back the number on your caller ID and asking for a reference number and calling the organization to verify it can both help verify the caller's identity, asking the caller to provide sensitive information to prove their identity is not recommended."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "Using attack trees",
        "level": "expert",
        "question": "What is the difference between static and dynamic attack trees?",
        "answers": [
            {
                "a1": "Static attack trees are used for modeling physical systems, while dynamic attack trees are for modeling software systems."
            },
            {
                "a2": "Static attack trees do not incorporate countermeasures, while dynamic attack trees do."
            },
            {
                "a3": "Dynamic attack trees can be used for runtime analysis, while static attack trees cannot."
            },
            {
                "a4": "Static attack trees do not show the order of steps in an attack scenario, while dynamic attack trees do."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. The type of system being modeled does not determine whether a tree is static or dynamic."
            },
            {
                "a2": "Incorrect. Static attack trees can incorporate countermeasures, though they do not show their effect on the attack scenario."
            },
            {
                "a3": "Correct. Dynamic attack trees can be used for runtime analysis, allowing for real-time monitoring and updates to the model. Static attack trees do not have this capability."
            },
            {
                "a4": "Incorrect. Both static and dynamic attack trees can show the order of steps in an attack scenario."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "Understanding your system and environment",
        "level": "advanced",
        "question": "How do external factors such as vendors and suppliers affect threat modeling?",
        "answers": [
            {
                "a": "They play no role in threat modeling"
            },
            {
                "b": "They may introduce new risks and vulnerabilities that need to be evaluated and managed"
            },
            {
                "c": "They are only relevant in certain industries or sectors"
            },
            {
                "d": "They are primarily the responsibility of the vendor or supplier, not the business"
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. External factors such as vendors and suppliers can play a significant role in threat modeling."
            },
            {
                "b": "Correct. External factors such as vendors and suppliers can introduce new risks and vulnerabilities that need to be evaluated and managed in order to effectively protect critical assets and reduce the likelihood of successful attacks."
            },
            {
                "c": "Incorrect. While some industries or sectors may be more susceptible to certain types of external factors, they can be relevant in any context."
            },
            {
                "d": "Incorrect. While vendors and suppliers may have their own responsibilities, businesses also have a responsibility to evaluate and manage risks introduced by external factors in order to effectively protect their assets."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Encryption in transit and at rest",
        "level": "beginner",
        "question": "What does encryption in transit and at rest mean?",
        "answers": [
            {
                "a1": "Encryption only in transit"
            },
            {
                "a2": "Encryption only at rest"
            },
            {
                "a3": "Encryption both during transmission and while stored"
            },
            {
                "a4": "No encryption at all"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Encryption in transit refers to securing data while being transmitted."
            },
            {
                "a2": "Incorrect. Encryption at rest refers to securing data while being stored."
            },
            {
                "a3": "Correct!"
            },
            {
                "a4": "Incorrect. Encryption is necessary to protect sensitive data."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Keeping your Devices Secure",
        "level": "beginner",
        "question": "What is the purpose of implementing a password on your device?",
        "answers": [
            {
                "a1": "To make your device look cool"
            },
            {
                "a2": "To keep unauthorized users from accessing your device"
            },
            {
                "a3": "To boost your device's performance"
            },
            {
                "a4": "To prevent software updates"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. A password has nothing to do with making your device look cool."
            },
            {
                "a2": "Correct. Implementing a password helps prevent unauthorized users from accessing your device."
            },
            {
                "a3": "Incorrect. A password has nothing to do with your device's performance."
            },
            {
                "a4": "Incorrect. A password has nothing to do with preventing software updates."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Encryption in transit and at rest",
        "level": "advanced",
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "answers": [
            {
                "a1": "Symmetric encryption uses the same key for encryption and decryption, while asymmetric uses different keys."
            },
            {
                "a2": "Symmetric encryption is faster than asymmetric encryption."
            },
            {
                "a3": "Asymmetric encryption is more secure than symmetric encryption."
            },
            {
                "a4": "Both symmetric and asymmetric encryption use the same key for encryption and decryption."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct! Symmetric encryption uses one key for both encryption and decryption, while asymmetric encryption uses different keys."
            },
            {
                "a2": "Incorrect. Symmetric encryption is generally faster, but it is less secure than asymmetric encryption."
            },
            {
                "a3": "Incorrect. Asymmetric encryption is more secure, but it is slower than symmetric encryption."
            },
            {
                "a4": "Incorrect. Symmetric encryption uses one key for both encryption and decryption, while asymmetric encryption uses different keys."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Password Security",
        "level": "advanced",
        "question": "What is a common mistake people make with password security?",
        "answers": [
            {
                "a1": "Using the same password across multiple accounts."
            },
            {
                "a2": "Using a password manager."
            },
            {
                "a3": "Changing passwords too frequently."
            },
            {
                "a4": "Sharing passwords with family members."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Using the same password across multiple accounts is a common mistake that can compromise password security."
            },
            {
                "a2": "Incorrect. Password managers are a useful tool for password security."
            },
            {
                "a3": "Incorrect. Changing passwords frequently is a good practice for password security."
            },
            {
                "a4": "Incorrect. Sharing passwords with others is a security risk, but it is not the most common mistake people make with password security."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Vishing (Voice Phishing)",
        "level": "expert",
        "question": "What is the difference between vishing and phishing?",
        "answers": [
            {
                "a1": "Vishing involves using social engineering techniques to deceive victims over the phone, while phishing involves using social engineering techniques to deceive victims over email or text."
            },
            {
                "a2": "Vishing involves using malware to steal sensitive information, while phishing involves using social engineering techniques to steal sensitive information."
            },
            {
                "a3": "Vishing involves targeting individuals using personalized information, while phishing involves targeting a broad audience."
            },
            {
                "a4": "Vishing and phishing are the same thing."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Vishing and phishing both involve using social engineering techniques to deceive victims, but vishing specifically involves doing so over the phone, while phishing involves doing so over email or text."
            },
            {
                "a2": "Incorrect. While phishing does involve using social engineering techniques to steal sensitive information, it typically does not involve using malware, while vishing does not typically involve using malware either."
            },
            {
                "a3": "Incorrect. Phishing attacks can be personalized or targeted, while vishing attacks can target a broad audience as well."
            },
            {
                "a4": "Incorrect. Vishing and phishing are different types of social engineering attacks that involve using different communication channels."
            }
        ]
    },
    {
        "topic": "General",
        "category": "CEO Fraud",
        "level": "expert",
        "question": "What legal actions can a company take against perpetrators of CEO fraud?",
        "answers": [
            {
                "a1": "File a lawsuit against the perpetrators in civil court"
            },
            {
                "a2": "Report the fraud to law enforcement agencies such as the FBI or Interpol"
            },
            {
                "a3": "Pursue extradition of the perpetrators in cases involving international fraud"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Companies can file a lawsuit against the perpetrators of CEO fraud in civil court to recover financial losses and damages."
            },
            {
                "a2": "Correct. Reporting the fraud to law enforcement agencies such as the FBI or Interpol can help identify and apprehend the perpetrators."
            },
            {
                "a3": "Correct. Pursuing extradition of the perpetrators in cases involving international fraud can lead to their arrest and prosecution."
            },
            {
                "a4": "Correct. All three options are available to companies to take legal action against perpetrators of CEO fraud."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Remote Work Security",
        "level": "expert",
        "question": "What is the difference between data backups and data replication?",
        "answers": [
            {
                "a1": "Data backups protect against accidental deletion, while data replication protects against hardware failure"
            },
            {
                "a2": "Data backups create redundant copies, while data replication maintains a single copy"
            },
            {
                "a3": "Data backups are offline, while data replication is online and real-time"
            },
            {
                "a4": "Data backups create incremental copies, while data replication creates full copies"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Partially correct. Data backups do in fact protect against accidental deletion, but they can also prevent data loss from hardware failure and other disasters. Data replication can also protect against hardware failure."
            },
            {
                "a2": "Correct. Data backups create redundant copies of data at regular intervals, while data replication maintains a single copy of data that is constantly updated."
            },
            {
                "a3": "Incorrect. Both data backups and data replication can be performed online and in real-time or offline."
            },
            {
                "a4": "Incorrect. Data backups can be either full or incremental, while data replication always creates full copies."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Impersonation Fraud",
        "level": "expert",
        "question": "What is a common red flag that can indicate an attempted impersonation fraud?",
        "answers": [
            {
                "a1": "A request for payment using cryptocurrency"
            },
            {
                "a2": "A request for payment using a wire transfer"
            },
            {
                "a3": "A request for personal information in an unsolicited email or phone call"
            },
            {
                "a4": "A request for payment that is significantly higher than normal"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. While cryptocurrency can be associated with some types of cyber crime, it is not necessarily a red flag for impersonation fraud specifically."
            },
            {
                "a2": "Incorrect. Wire transfers are a common method for legitimate transactions and may not indicate fraud on their own."
            },
            {
                "a3": "Correct. Unsolicited requests for personal information or payment are a common tactic used by perpetrators of impersonation fraud."
            },
            {
                "a4": "Incorrect. An unusually high payment amount could be a red flag for fraud in general, but does not necessarily indicate impersonation fraud."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Internet Safety",
        "level": "expert",
        "question": "What is the danger of oversharing on social media?",
        "answers": [
            {
                "a1": "Oversharing can lead to identity theft and financial fraud."
            },
            {
                "a2": "Oversharing can open up the possibility of cyberbullying and harassment."
            },
            {
                "a3": "Oversharing can expose personal information and compromise privacy."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Oversharing personal information can make it easier for identity thieves to steal financial information."
            },
            {
                "a2": "Correct. Oversharing can make it easier for cyberbullies to target and harass individuals online."
            },
            {
                "a3": "Correct. Oversharing can expose personal information and compromise privacy, leading to potential risks such as identity theft or tracking."
            },
            {
                "a4": "Correct. All of the above are possible dangers of oversharing on social media."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Staying Secure in your Workplace",
        "level": "intermediate",
        "question": "What is phishing?",
        "answers": [
            {
                "a1": "A type of malware that locks down your computer or network"
            },
            {
                "a2": "A type of attack that uses physical force to gain access to a secure area"
            },
            {
                "a3": "A type of fraud where an attacker sends a fake email or website to trick victims into sharing sensitive information"
            },
            {
                "a4": "A type of social engineering attack that involves tricking someone into revealing their password"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. This describes ransomware, not phishing."
            },
            {
                "a2": "Incorrect. This describes a physical security breach, not phishing."
            },
            {
                "a3": "Correct. Phishing is a type of fraud where an attacker sends a fake email or website that appears legitimate in order to trick victims into sharing sensitive information, such as login credentials or financial information."
            },
            {
                "a4": "Incorrect. This describes a type of social engineering attack called \"password spraying,\" not phishing."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Dynamic application security testing (DAST)",
        "level": "beginner",
        "question": "Which of the following best describes DAST testing tools?",
        "answers": [
            {
                "a1": "DAST tools evaluate web applications by simulating real-world attacks"
            },
            {
                "a2": "DAST tools provide recommendations for fixing vulnerabilities in the application code"
            },
            {
                "a3": "DAST tools only test web applications from the user's perspective"
            },
            {
                "a4": "DAST tools are not useful as part of a security testing plan"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. DAST tools simulate real-world attacks on web applications to identify vulnerabilities in the code."
            },
            {
                "a2": "Incorrect. While DAST tools do recommend ways to fix vulnerabilities, this is not the best description of their purpose."
            },
            {
                "a3": "Incorrect. DAST tools test web applications from both the user's and attacker's perspectives, not just the user's."
            },
            {
                "a4": "Incorrect. DAST tools are a valuable part of any security testing plan."
            }
        ]
    },
    {
        "topic": "Social Media",
        "category": "Staying Safe on Social Media",
        "level": "intermediate",
        "question": "What should you do if you come across hate speech or cyberbullying?",
        "answers": [
            {
                "a1": "Block the offender"
            },
            {
                "a2": "Engage the offender in conversation"
            },
            {
                "a3": "Report the behavior to the social media platform"
            },
            {
                "a4": "Ignore and move on"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Blocking the offender is a good start, but it doesn't prevent them from attacking others."
            },
            {
                "a2": "Incorrect. Engaging with the offender can make things worse and encourage them to continue their negative behavior."
            },
            {
                "a3": "Correct! Reporting the behavior to the social media platform is essential as it can lead to the removal of the offending material and even account suspension in the worst case."
            },
            {
                "a4": "Incorrect. Ignoring the behavior can make it easier for the offender to target others, and it doesn't prevent them from doing it again in the future."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Authentication Architecture",
        "level": "intermediate",
        "question": "What are the most commonly used Authentication Architecture schemes?",
        "answers": [
            {
                "a1": "Single Sign-On (SSO) and Multi-Factor Authentication (MFA)"
            },
            {
                "a2": "OAuth and OpenID Connect"
            },
            {
                "a3": "Kerberos and LDAP"
            },
            {
                "a4": "SAML and JWT"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Single Sign-On (SSO) and Multi-Factor Authentication (MFA) are commonly used schemes in Authentication Architecture."
            },
            {
                "a2": "Incorrect. OAuth and OpenID Connect are more commonly used for authorization, rather than authentication."
            },
            {
                "a3": "Incorrect. Kerberos and LDAP are outdated technologies that are not widely used nowadays for authentication."
            },
            {
                "a4": "Incorrect. SAML and JWT are also commonly used in Authentication Architecture, but SSO and MFA are more prevalent."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Avoiding Ransomware",
        "level": "intermediate",
        "question": "Which of the following is NOT a common way ransomware spreads?",
        "answers": [
            {
                "a1": "Email phishing attacks"
            },
            {
                "a2": "Software vulnerabilities"
            },
            {
                "a3": "USB flash drive infections"
            },
            {
                "a4": "Social media ads"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Email phishing attacks are a common way ransomware spreads, often through email attachments or links."
            },
            {
                "a2": "Incorrect. Exploiting software vulnerabilities is a common method used by ransomware creators to infect computer systems with malware."
            },
            {
                "a3": "Incorrect. Ransomware can also be spread through USB flash drives that are infected with malware."
            },
            {
                "a4": "Correct. While social media can be used as a vector for spreading malware, it is not a common way ransomware spreads."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Defense in depth",
        "level": "expert",
        "question": "What are the advantages and disadvantages of using a cloud-based security solution as part of a Defense in Depth approach?",
        "answers": [
            {
                "a": "Advantages: scalability, cost-effectiveness, high reliability. Disadvantages: lack of control, data privacy concerns."
            },
            {
                "b": "Advantages: flexibility, agility, ease of use. Disadvantages: high latency, lack of customization, low security."
            },
            {
                "c": "Advantages: reduced complexity, improved performance, better compliance. Disadvantages: high cost, limited availability, vendor lock-in."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Using a cloud-based security solution can offer a scalable and cost-effective alternative to on-premise solutions, while still providing high reliability. However, it comes with some disadvantages such as lack of control and data privacy concerns."
            },
            {
                "b": "Incorrect. While some of the advantages are partially true, the disadvantages are incorrect."
            },
            {
                "c": "Incorrect. The advantages and disadvantages are incorrect."
            },
            {
                "d": "Incorrect. Answer choice d is incorrect because not all of the above are true. Answer choice a is the correct answer."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Defense in depth",
        "level": "intermediate",
        "question": "Which of the following is NOT an example of a layer in a Defense in Depth approach?",
        "answers": [
            {
                "a": "Physical security"
            },
            {
                "b": "Encryption"
            },
            {
                "c": "Access control"
            },
            {
                "d": "Software updates"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Incorrect. Physical security is an important layer in a Defense in Depth approach, especially for protecting physical assets."
            },
            {
                "b": "Incorrect. Encryption is a common and effective layer for protecting data."
            },
            {
                "c": "Incorrect. Access control is another common and effective layer for protecting against unauthorized access."
            },
            {
                "d": "Correct. Software updates are not a layer of a Defense in Depth approach, but they are still an important security measure."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Social Media Safety",
        "level": "beginner",
        "question": "What is social media safety?",
        "answers": [
            {
                "a": "Ensuring personal security and avoiding any use of social media platforms"
            },
            {
                "b": "Taking measures to protect oneself, information, and privacy on social media platforms"
            },
            {
                "c": "Only sharing personal information with friends and family on social media platforms"
            },
            {
                "d": "Reporting any suspicious activity to the social media platform"
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Social media safety does not involve avoiding the use of social media platforms altogether."
            },
            {
                "b": "Correct. Social media safety refers to taking measures to protect oneself, information, and privacy on social media platforms."
            },
            {
                "c": "Incorrect. It is not enough to only share personal information with friends and family, as they can also share it with others or lose access to their accounts."
            },
            {
                "d": "Incorrect. While reporting suspicious activity is important, it is only one aspect of social media safety."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Errors, Logging and Auditing Architecture",
        "level": "intermediate",
        "question": "Which of the following is not an important aspect of implementing Errors, Logging, and Auditing Architecture?",
        "answers": [
            {
                "a": "Identifying critical system events"
            },
            {
                "b": "Assigning individual logins to all users"
            },
            {
                "c": "Securing logs from unauthorized access"
            },
            {
                "d": "Integrating with automated alert systems"
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Identifying critical system events is important for implementing Errors, Logging, and Auditing Architecture."
            },
            {
                "b": "Correct. Assigning individual logins to all users is not an important aspect of implementing Errors, Logging, and Auditing Architecture."
            },
            {
                "c": "Incorrect. Securing logs from unauthorized access is important for implementing Errors, Logging, and Auditing Architecture."
            },
            {
                "d": "Incorrect. Integrating with automated alert systems is important for implementing Errors, Logging, and Auditing Architecture."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Microservice Architectures",
        "level": "beginner",
        "question": "What is a microservice architecture?",
        "answers": [
            {
                "a1": "An approach in software development where applications are composed of small, independent services that communicate with each other through APIs."
            },
            {
                "a2": "A software architecture where all services are combined into a monolithic application."
            },
            {
                "a3": "An approach where applications are developed by one person instead of a team."
            },
            {
                "a4": "A software architecture where services are developed and managed by separate companies."
            }
        ],
        "correct_answer": [
            "a1"
        ],
        "explanations": [
            {
                "a1": "Correct. In a microservice architecture, applications are made up of smaller services that interact with each other through APIs, allowing them to be developed, deployed and scaled independently."
            },
            {
                "a2": "Incorrect. A monolithic application has all services combined while a microservice architecture involves the breaking down of applications into smaller, independent services."
            },
            {
                "a3": "Incorrect. A single person developing an application does not constitute a microservice architecture."
            },
            {
                "a4": "Incorrect. Services are developed and managed by the same company in a microservice architecture."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Security logging and monitoring",
        "level": "expert",
        "question": "What is the difference between Security Information Management (SIM) and Security Event Management (SEM)?",
        "answers": [
            {
                "a1": "SIM is concerned with long-term data storage and analysis, while SEM is focused on real-time event analysis."
            },
            {
                "a2": "SIM collects and stores data from all security devices, while SEM analyzes data from specific devices."
            },
            {
                "a3": "SIM is focused on analyzing data correlation, while SEM is focused on analyzing network traffic."
            },
            {
                "a4": "There is no difference between SIM and SEM."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. SIM and SEM perform different functions within the greater scope of security logging and monitoring. SIM is designed for long-term data storage and analysis, while SEM focuses on real-time event analysis."
            },
            {
                "a2": "Incorrect. While SIM does collect and store data from various sources, it is not exclusive to security devices. Similarly, SEM may analyze data from specific devices, but this is not its only function."
            },
            {
                "a3": "Incorrect. While data correlation and network traffic analysis are important components of security logging and monitoring, they are not the sole functions of SIM and SEM, respectively."
            },
            {
                "a4": "Incorrect. There is a clear distinction between SIM and SEM in terms of their purpose and function."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Workplace Security",
        "level": "beginner",
        "question": "What is workplace security?",
        "answers": [
            {
                "a": "Measures taken to prevent unauthorized access or intrusion into a workplace, and keeping employees safe from potential threats or criminal activities."
            },
            {
                "b": "A type of insurance that protects businesses from losses due to theft or damage of assets."
            },
            {
                "c": "Software designed to keep computers and other electronic devices secure and free from viruses."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Workplace security involves measures taken to prevent unauthorized access or intrusion into a workplace, and keeping employees safe from potential threats or criminal activities such as physical threats, cybersecurity breaches, and theft of assets."
            },
            {
                "b": "Incorrect. This describes a type of insurance, not workplace security."
            },
            {
                "c": "Incorrect. This describes antivirus software, not workplace security."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Communications Architecture",
        "level": "intermediate",
        "question": "What is the purpose of a communications protocol?",
        "answers": [
            {
                "a1": "To establish a standard format for exchanging data between devices."
            },
            {
                "a2": "To provide security for data transmission."
            },
            {
                "a3": "To ensure reliability in data transmission."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. A communications protocol establishes a standard format for exchanging data between devices to ensure interoperability."
            },
            {
                "a2": "Correct. A communications protocol can include security measures that ensure the confidentiality, integrity, and availability of transmitted data."
            },
            {
                "a3": "Correct. A communications protocol can include measures to ensure that data is transmitted reliably, such as error checking and packet acknowledgement."
            },
            {
                "a4": "Correct. A communications protocol can include all of these measures to ensure effective and secure communication."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Sharing Data and Documents Securely",
        "level": "beginner",
        "question": "Which of the following is an example of a secure communication channel used for sharing sensitive data?",
        "answers": [
            {
                "a": "Email"
            },
            {
                "b": "Fax"
            },
            {
                "c": "Social Media"
            },
            {
                "d": "Virtual Private Network (VPN)"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Incorrect. Email is not a secure communication channel, as emails can be intercepted or hacked."
            },
            {
                "b": "Incorrect. Fax is not a secure communication channel, as the transmitted data can be intercepted."
            },
            {
                "c": "Incorrect. Social Media is not a secure communication channel, as the information shared can be easily accessed and tracked."
            },
            {
                "d": "Correct. VPN provides a secure communication channel, as the data is encrypted and transmitted through a private network."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Email Safety",
        "level": "advanced",
        "question": "What is the term used to describe an email attack that uses a seemingly legitimate source to steal sensitive information?",
        "answers": [
            {
                "a1": "Spoofing"
            },
            {
                "a2": "Phishing"
            },
            {
                "a3": "Malware"
            },
            {
                "a4": "Spear-phishing"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Spoofing refers to the practice of creating a fake email address or website to deceive users."
            },
            {
                "a2": "Incorrect. Phishing refers to the practice of using fraudulent email messages that appear to be from legitimate sources."
            },
            {
                "a3": "Incorrect. Malware refers to malicious software that is designed to harm or damage computer systems or networks."
            },
            {
                "a4": "Correct. Spear-phishing is a type of phishing attack that targets specific individuals or organizations and uses information about them to increase the chances of success. Attackers may use a seemingly legitimate source, such as a colleague or a customer, to trick their targets into revealing sensitive information or clicking on links or attachments."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Safety when Working from Home",
        "level": "advanced",
        "question": "What should you do to ensure your online safety while working from home?",
        "answers": [
            {
                "a1": "Use easy-to-guess passwords"
            },
            {
                "a2": "Click on unknown links in emails or messages"
            },
            {
                "a3": "Rely solely on antivirus software"
            },
            {
                "a4": "Protect sensitive information by encrypting files and using secure networks"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Using easy-to-guess passwords can compromise your online safety while working from home."
            },
            {
                "a2": "Incorrect. Clicking on unknown links in emails or messages can introduce malware into your system and compromise your online safety while working from home."
            },
            {
                "a3": "Incorrect. Relying solely on antivirus software is not enough to protect your online safety while working from home."
            },
            {
                "a4": "Correct. Protecting sensitive information by encrypting files and using secure networks ensures your online safety while working from home."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Source code management (SCM)",
        "level": "intermediate",
        "question": "What is branching in SCM?",
        "answers": [
            {
                "a1": "Creating a new version of the codebase"
            },
            {
                "a2": "Creating independent lines of development"
            },
            {
                "a3": "Creating backup copies of code"
            },
            {
                "a4": "Compressing the code for storage"
            }
        ],
        "correct_answer": [
            "a2"
        ],
        "explanations": [
            {
                "a1": "Incorrect. Creating a new version of the codebase is called forking or cloning."
            },
            {
                "a2": "Correct. Branching is creating independent lines of development, allowing different features to be worked on separately."
            },
            {
                "a3": "Incorrect. Creating backup copies of code is called backups or versioning."
            },
            {
                "a4": "Incorrect. Compressing the code for storage is called archiving."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Social Engineering",
        "level": "expert",
        "question": "What is pretexting in Social Engineering?",
        "answers": [
            {
                "a1": "A type of phishing attack."
            },
            {
                "a2": "A way to impersonate someone else in order to gain information."
            },
            {
                "a3": "A way to exploit someone's trust in a position of authority."
            },
            {
                "a4": "A way to use reverse social engineering to gain access to a system."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Pretexting is not a type of phishing attack."
            },
            {
                "a2": "Correct. Pretexting involves creating a false pretense or persona in order to trick someone into divulging information or taking an action they wouldn't normally take."
            },
            {
                "a3": "Incorrect. While exploiting trust in authority is a common tactic in Social Engineering, it is not specific to pretexting."
            },
            {
                "a4": "Incorrect. Reverse social engineering involves the attacker creating the pretense of needing help or being a victim in order to trick the target into providing information or access. Pretexting is different, as it involves the attacker creating a false persona to gain information or access."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Secure File Upload Architecture",
        "level": "intermediate",
        "question": "Which encryption algorithm is commonly used in Secure File Upload Architecture?",
        "answers": [
            {
                "a1": "DES"
            },
            {
                "a2": "AES"
            },
            {
                "a3": "RSA"
            },
            {
                "a4": "SHA"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. DES (Data Encryption Standard) is an outdated algorithm that has been compromised and is no longer considered secure enough for modern applications."
            },
            {
                "a2": "Correct. AES (Advanced Encryption Standard) is a widely used encryption algorithm that is considered very secure and is commonly used in Secure File Upload Architecture."
            },
            {
                "a3": "Incorrect. RSA (Rivest–Shamir–Adleman) is a public-key encryption algorithm that is mainly used for secure data transmission, digital signatures, and key exchange. It is not commonly used in Secure File Upload Architecture."
            },
            {
                "a4": "Incorrect. SHA (Secure Hash Algorithm) is a cryptographic hash function that is used to secure data and electronic signatures, but not to encrypt files in transit."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Session management",
        "level": "beginner",
        "question": "What are session tokens?",
        "answers": [
            {
                "a1": "Random strings generated by clients"
            },
            {
                "a2": "Strings generated by server upon authentication"
            },
            {
                "a3": "Passwords used for authentication"
            },
            {
                "a4": "Encryption keys used for storing data"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Session tokens are generated by the server, not the client."
            },
            {
                "a2": "Correct. Session tokens are generated by the server upon authentication."
            },
            {
                "a3": "Incorrect. Passwords are used for user authentication, not session management."
            },
            {
                "a4": "Incorrect. Encryption keys are not used for session management, but for data protection."
            }
        ]
    },
    {
        "topic": "OWASP Top 10",
        "category": "Total Overview",
        "level": "advanced",
        "question": "Which of the following is NOT an impact of Insecure Direct Object References?",
        "answers": [
            {
                "a1": "Impersonation"
            },
            {
                "a2": "Data Leakage or Loss"
            },
            {
                "a3": "Elevation of Privilege"
            },
            {
                "a4": "Denial of Service"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. An attacker can use insecure direct object references to access and modify data belonging to other users or system roles, allowing them to impersonate that user or role."
            },
            {
                "a2": "Incorrect. Insecure direct object references can expose sensitive data, such as personal or financial information, that can be leaked or lost to unauthorized entities."
            },
            {
                "a3": "Incorrect. By exploiting insecure direct object references, an attacker can gain elevated permissions or access, enabling them to perform actions they are not authorized to do, such as changing passwords or configurations."
            },
            {
                "a4": "Correct. Denial of Service (DoS) attacks refer to the intentional or accidental disruption or slowdown of a system or network, in order to prevent legitimate users from accessing resources. DoS attacks are not related to insecure direct object references."
            }
        ]
    },
    {
        "topic": "Testing",
        "category": "Foundations for Software Testing",
        "level": "intermediate",
        "question": "What is the difference between verification and validation?",
        "answers": [
            {
                "a1": "Verification is the process of evaluating a system or component to check it meets its specification, while validation is the process of evaluating a system or component during or at the end of the development process to determine whether it satisfies specified requirements."
            },
            {
                "a2": "Verification is the process of evaluating a system or component during or at the end of the development process to determine whether it satisfies specified requirements, while validation is the process of evaluating a system or component to check it meets its specification."
            },
            {
                "a3": "Verification and validation both mean the same thing."
            },
            {
                "a4": "Verification is the process of testing individual components of a system, while validation is the process of testing the entire system."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Verification is the process of evaluating a system or component to check it meets its specification, while validation is the process of evaluating a system or component during or at the end of the development process to determine whether it satisfies specified requirements."
            },
            {
                "a2": "Incorrect. Verification is the process of evaluating a system or component to check it meets its specification, while validation is the process of evaluating a system or component during or at the end of the development process to determine whether it satisfies specified requirements."
            },
            {
                "a3": "Incorrect. Verification and validation have different meanings."
            },
            {
                "a4": "Incorrect. Verification and validation are not related to testing individual components or the entire system."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Smishing",
        "level": "intermediate",
        "question": "What are some common smishing techniques?",
        "answers": [
            {
                "a1": "Sending fraudulent text messages claiming to be from a legitimate organization."
            },
            {
                "a2": "Sending malicious links that install malware on the phone when clicked."
            },
            {
                "a3": "Requests for sensitive information or immediate action with a sense of urgency."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. This is a common smishing technique."
            },
            {
                "a2": "Correct. This is a common smishing technique."
            },
            {
                "a3": "Correct. This is a common smishing technique."
            },
            {
                "a4": "Correct. All of the listed answers are common techniques used in smishing attacks."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Keeping your Devices Secure",
        "level": "expert",
        "question": "What is a virtual private network (VPN) and how can it help keep your device secure?",
        "answers": [
            {
                "a1": "A VPN is a type of malware that can infect your device"
            },
            {
                "a2": "A VPN is a way to encrypt your device's internet connection to prevent unauthorized access"
            },
            {
                "a3": "A VPN is a type of firewall that prevents unauthorized access to your device"
            },
            {
                "a4": "A VPN is a way to compress data on your device, freeing up space"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. A VPN is not a type of malware."
            },
            {
                "a2": "Correct. A VPN encrypts your device's internet connection, making it more difficult for hackers to intercept your data."
            },
            {
                "a3": "Incorrect. A firewall is a different type of security measure that can help keep your device secure, but it is not a VPN."
            },
            {
                "a4": "Incorrect. Compressing data on your device has nothing to do with the purpose of a VPN."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Session management",
        "level": "expert",
        "question": "What is the risk of session fixation, and how can it be prevented?",
        "answers": [
            {
                "a1": "Session fixation is the risk of an attacker initiating a user session and then hijacking it, which can be prevented by using anti-CSRF tokens"
            },
            {
                "a2": "Session fixation is the risk of an attacker passing their own session token to a user, which can be prevented by regenerating session identifiers upon authentication"
            },
            {
                "a3": "Session fixation is the risk of an attacker intercepting a user's session token, which can be prevented by using server-side session storage instead of cookies"
            },
            {
                "a4": "Session fixation is the risk of a user's session staying active after logout, which can be prevented by implementing proper cache control headers"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Session fixation is the risk of an attacker tricking a user into using a session with a known identifier, which can be prevented by using session IDs which are regenerated upon authentication."
            },
            {
                "a2": "Correct. Session fixation is the risk of an attacker passing their own session token to a user, which can be prevented by regenerating session identifiers upon authentication."
            },
            {
                "a3": "Incorrect. Session hijacking is the risk of an attacker intercepting a user's session token, not session fixation. Server-side session storage may improve security, but it does not prevent session fixation."
            },
            {
                "a4": "Incorrect. Proper cache control headers can help prevent unauthorized access to cached resources, but they do not prevent session fixation."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Cyber Fundamentals",
        "level": "expert",
        "question": "What is the role of a security operations center (SOC) in cybersecurity?",
        "answers": [
            {
                "a": "To design and implement cybersecurity policies and procedures"
            },
            {
                "b": "To monitor and analyze network traffic for signs of cyber attacks"
            },
            {
                "c": "To investigate and respond to security incidents in real time"
            },
            {
                "d": "To provide cybersecurity training and awareness programs for employees"
            }
        ],
        "correct_answer": "c",
        "explanations": [
            {
                "a": "Incorrect. While a SOC may be involved in designing policies and procedures, this is not typically its primary function."
            },
            {
                "b": "Incorrect. SOC analysts are responsible for monitoring network traffic, but this is only one part of their job."
            },
            {
                "c": "Correct. A SOC is responsible for detecting, investigating, and responding to security incidents as they occur. This involves monitoring network and system logs, analyzing alerts, and coordinating with other teams to address threats in real time."
            },
            {
                "d": "Incorrect. While cybersecurity training and awareness programs are important, they are usually the responsibility of a separate team within an organization."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Identity Theft Prevention",
        "level": "beginner",
        "question": "What is one way to prevent identity theft?",
        "answers": [
            {
                "a1": "Leaving personal information in public areas"
            },
            {
                "a2": "Using the same password for all accounts"
            },
            {
                "a3": "Monitoring credit reports"
            },
            {
                "a4": "Responding to unsolicited emails"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Leaving personal information in public areas increases the risk of identity theft."
            },
            {
                "a2": "Incorrect. Using the same password for all accounts makes it easier for hackers to access your information if one password is compromised."
            },
            {
                "a3": "Correct. Monitoring credit reports can help you detect any unauthorized activity."
            },
            {
                "a4": "Incorrect. Responding to unsolicited emails can lead to giving away personal information to scammers."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Least privilege",
        "level": "intermediate",
        "question": "What are the three roles that are involved in implementing the principle of least privilege?",
        "answers": [
            {
                "a1": "Implementation, management, and information security teams."
            },
            {
                "a2": "System administrators, network engineers, and compliance team."
            },
            {
                "a3": "Information security teams, management, and system administrators."
            },
            {
                "a4": "Management, developers, and HR teams."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. While these teams may be involved in implementing cybersecurity policies and strategies, they are not specifically responsible for implementing least privilege."
            },
            {
                "a2": "Incorrect. while these teams may have a role to play in implementing least privilege, they are not the only roles involved."
            },
            {
                "a3": "Correct. The implementation of least privilege requires the involvement of information security teams, management, and system administrators. Information security teams are responsible for developing policies and procedures to implement the concept, while management provides the necessary support and resources. System administrators must also ensure that access controls are set according to the defined policies and procedures."
            },
            {
                "a4": "Incorrect. HR teams and developers may be involved in implementing cybersecurity policies, but they are not specifically responsible for implementing least privilege."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Account Takeover",
        "level": "advanced",
        "question": "What is two-factor authentication and how does it help prevent account takeover?",
        "answers": [
            {
                "a": "Two-factor authentication is the use of two different passwords for one account, making it more difficult for attackers to gain access."
            },
            {
                "b": "Two-factor authentication is the use of a password and a fingerprint or facial recognition scan to authenticate a user's identity."
            },
            {
                "c": "Two-factor authentication is the use of a password and a secondary device, such as a phone or token, to verify a user's identity."
            },
            {
                "d": "Two-factor authentication is a type of social engineering scam that targets users with multiple emails asking for their login credentials."
            }
        ],
        "correct_answer": "c",
        "explanations": [
            {
                "a": "Incorrect. Two-factor authentication does involve two steps, but not two separate passwords."
            },
            {
                "b": "Incorrect. Biometric authentication can be part of two-factor authentication, but it is not the only method."
            },
            {
                "c": "Correct. Two-factor authentication involves entering a password and then using a secondary device, such as a phone or token, to further verify the user's identity. This prevents account takeover by making it much more difficult for a thief to access the account."
            },
            {
                "d": "Incorrect. Two-factor authentication is not a social engineering scam, but cyber criminals may use social engineering tactics to try to obtain login credentials."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Psychological acceptability",
        "level": "expert",
        "question": "What is the theory behind biophilic design?",
        "answers": [
            {
                "a1": "Biophilic design seeks to create buildings that are completely biological and free of artificial materials."
            },
            {
                "a2": "Biophilic design seeks to create buildings that mimic natural environments and incorporate elements of nature."
            },
            {
                "a3": "Biophilic design seeks to create buildings that are interactive and respond to user needs and preferences."
            },
            {
                "a4": "Biophilic design seeks to create buildings that are energy-efficient and environmentally responsible."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Biophilic design does not seek to eliminate all artificial materials from buildings, but rather to incorporate natural elements in a meaningful way."
            },
            {
                "a2": "Correct. Biophilic design is based on the idea that humans have an innate connection to nature, and seeks to create buildings that mimic natural environments and incorporate elements of nature to improve wellbeing and productivity."
            },
            {
                "a3": "Incorrect. Interaction and response to user needs is a goal of user-centered design, but not specifically biophilic design."
            },
            {
                "a4": "Incorrect. Energy efficiency and environmental responsibility can be goals of sustainable design, but not specifically biophilic design."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Information Security",
        "level": "advanced",
        "question": "What is the difference between vulnerability scanning and penetration testing?",
        "answers": [
            {
                "a1": "Vulnerability scanning is a process of identifying security weaknesses in networks, systems and applications. Penetration testing is a method used to exploit the vulnerabilities to assess the impact of an attack."
            },
            {
                "a2": "Vulnerability scanning is a method used to assess the impact of an attack. Penetration testing is a process of identifying security weaknesses in networks, systems and applications."
            },
            {
                "a3": "Vulnerability scanning and penetration testing are the same thing."
            },
            {
                "a4": "None of the above."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Vulnerability scanning is a process of scanning a target network, system or application to identify known vulnerabilities that can be exploited by an attacker. Penetration testing, on the other hand, is the process of simulating a real-world attack on a network, system or application to identify security weaknesses and assess the impact of an attack."
            },
            {
                "a2": "Incorrect. The roles of vulnerability scanning and penetration testing mentioned in this option are reversed."
            },
            {
                "a3": "Incorrect. Vulnerability scanning and penetration testing are two distinct processes with different goals and methodologies."
            },
            {
                "a4": "Incorrect. Option d provides no useful information regarding the difference between vulnerability scanning and penetration testing."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Security culture and shift-left",
        "level": "expert",
        "question": "What are some benefits of a shift-left approach?",
        "answers": [
            {
                "a": "Decreased cost of software development"
            },
            {
                "b": "Increased collaboration between development and security teams"
            },
            {
                "c": "Increased speed of software release"
            },
            {
                "d": "All of the above"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Partially correct. A shift-left approach can decrease the cost of software development by catching security issues earlier in the development process."
            },
            {
                "b": "Partially correct. A shift-left approach encourages increased collaboration between development and security teams, which can lead to better security outcomes."
            },
            {
                "c": "Partially correct. A shift-left approach can increase the speed of software release by catching security issues earlier in the development process."
            },
            {
                "d": "Correct. A shift-left approach can lead to decreased cost, increased collaboration, and increased speed of software release by catching security issues earlier in the development process."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Email Safety",
        "level": "expert",
        "question": "What is the difference between a virus and a Trojan horse in the context of email attachments?",
        "answers": [
            {
                "a1": "A virus is designed to replicate itself and infect other systems, while a Trojan horse appears harmless but contains malicious code or instructions."
            },
            {
                "a2": "A virus is a type of malware that spreads through email attachments, while a Trojan horse is a software program that can perform various functions."
            },
            {
                "a3": "A virus can be detected and neutralized by antivirus software, while a Trojan horse is difficult to detect because it appears harmless."
            },
            {
                "a4": "A virus can self-replicate and spread across networks, while a Trojan horse requires user interaction to execute its malicious code."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. A virus is a piece of code or software that is designed to replicate itself and infect other systems, while a Trojan horse appears harmless or beneficial but contains malicious code or instructions that can cause harm or damage once executed. Both types of malware can be spread through email attachments."
            },
            {
                "a2": "Incorrect. This answer is partly correct. A virus is a type of malware that spreads through various methods, including email attachments, while a Trojan horse is a type of malware that tricks users into running it by appearing harmless or beneficial. However, it does not apply to the context of email attachments only."
            },
            {
                "a3": "Incorrect. This answer is partly correct. Viruses can often be detected and neutralized by antivirus software, while Trojan horses can sometimes evade detection because they appear harmless or beneficial. However, it does not address the differences between viruses and Trojan horses."
            },
            {
                "a4": "Incorrect. While viruses are self-replicating and can spread across networks, Trojan horses do not self-replicate or spread on their own and require user interaction to execute their malicious code. This answer does not address the differences between viruses and Trojan horses in the context of email attachments."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Access Control Architecture",
        "level": "expert",
        "question": "How does the Principle of Least Privilege apply in Access Control Architecture?",
        "answers": [
            {
                "a": "It states that users should be granted permission to access data, systems, or resources only to the extent necessary to perform their roles."
            },
            {
                "b": "It states that privileged access should be granted to all users to avoid permission conflicts."
            },
            {
                "c": "It states that users should have permission to modify data, systems, or resources as per their requirement."
            },
            {
                "d": "It states that users should have complete access to all data, systems, or resources in the organization."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. The Principle of Least Privilege is a concept in Access Control Architecture that states that a user should be granted permission to access data, systems, or resources only to the extent necessary to perform their roles. This minimizes the risk of information exposure or unauthorized access."
            },
            {
                "b": "Incorrect. This option contradicts the Principle of Least Privilege by granting privileged access to all users."
            },
            {
                "c": "Incorrect. This option violates the Principle of Least Privilege by allowing users to modify data, systems, or resources outside their job requirements."
            },
            {
                "d": "Incorrect. This option contradicts the Principle of Least Privilege by granting complete access to all users."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Keeping your Devices Secure",
        "level": "intermediate",
        "question": "What is two-factor authentication?",
        "answers": [
            {
                "a1": "A login process that requires only a password"
            },
            {
                "a2": "A login process that requires a password and a physical token, such as a code sent to a mobile phone"
            },
            {
                "a3": "A login process that requires a password and a fingerprint scan"
            },
            {
                "a4": "A login process that requires a password and a voice recognition scan"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Two-factor authentication requires more than just a password."
            },
            {
                "a2": "Correct. Two-factor authentication requires a password and a physical token, such as a code sent to a mobile phone."
            },
            {
                "a3": "Incorrect. Two-factor authentication requires a physical token in addition to a password, not a fingerprint scan."
            },
            {
                "a4": "Incorrect. Two-factor authentication requires a physical token in addition to a password, not a voice recognition scan."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Least privilege",
        "level": "advanced",
        "question": "What is the difference between mandatory access control (MAC) and discretionary access control (DAC)?",
        "answers": [
            {
                "a1": "Only MAC provides the ability to grant access on a need-to-know basis, while DAC does not."
            },
            {
                "a2": "Only DAC provides the ability to grant access on a need-to-know basis, while MAC does not."
            },
            {
                "a3": "MAC is a more flexible approach to access control, while DAC is more rigid."
            },
            {
                "a4": "DAC is only used in environments where there are a small number of users or resources to control, while MAC is used in more complex environments."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. The main difference between MAC and DAC is that MAC provides the ability to grant access on a need-to-know basis, while DAC does not. In MAC, access is granted according to predefined policies that are set by an administrator. DAC, on the other hand, allows users to control access to their own resources and does not require administrators to set policies. This makes it less secure than MAC, as users may not know what the most secure settings are for their resources."
            },
            {
                "a2": "Incorrect. DAC does not provide the ability to grant access on a need-to-know basis, as users can grant access to their own resources regardless of whether or not the person requesting access actually needs it."
            },
            {
                "a3": "Incorrect. MAC and DAC are both flexible and rigid in different ways. While MAC is more rigid in that access is granted according to predefined policies, it is also more flexible as it can accommodate a wide range of environments and users. DAC, on the other hand, is more flexible in allowing users to grant access to their own resources, but it is more rigid in its lack of predefined policies."
            },
            {
                "a4": "Incorrect. MAC and DAC are both used in a variety of environments, regardless of the number of users or resources to control. The choice between the two depends on the specific needs and requirements of the organization or system."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Risk, threats, and vulnerabilities",
        "level": "expert",
        "question": "What is the difference between an exploit and a payload in the context of cybersecurity?",
        "answers": [
            {
                "a1": "An exploit refers to the delivery mechanism of a payload, while a payload is the malicious code that is executed on the target system."
            },
            {
                "a2": "An exploit is the malicious code that is executed on the target system, while a payload is the attack surface that is targeted by the exploit."
            },
            {
                "a3": "An exploit and a payload are the same thing."
            },
            {
                "a4": "An exploit is a physical attack, while a payload is a digital attack."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. An exploit is the code or mechanism that allows a threat actor to deliver and execute a payload, which is the malicious code that is executed on the target system. In other words, the exploit is the vehicle and the payload is the cargo."
            },
            {
                "a2": "Incorrect. An exploit is not the malicious code itself, but rather the code or mechanism that allows the payload to be delivered and executed on the target system."
            },
            {
                "a3": "Incorrect. An exploit and payload are distinct concepts."
            },
            {
                "a4": "Incorrect. Exploits and payloads are digital attacks, not physical ones."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "applied to application",
        "level": "expert",
        "question": "How can you prioritize threats in a threat model?",
        "answers": [
            {
                "a1": "By using a risk matrix that takes into account the likelihood and impact of each threat."
            },
            {
                "a2": "By using a vulnerability scanner that identifies the most critical vulnerabilities."
            },
            {
                "a3": "By conducting penetration testing to determine which threats are the most exploitable."
            },
            {
                "a4": "By implementing all possible security controls to mitigate all threats."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Prioritizing threats involves using a risk matrix that takes into account the likelihood and impact of each threat. This helps to determine which threats are the most critical and require the most attention."
            },
            {
                "a2": "Incorrect. Vulnerability scanners can identify critical vulnerabilities, but they cannot prioritize threats."
            },
            {
                "a3": "Incorrect. Penetration testing can identify exploitable threats, but it does not provide a method for prioritizing them."
            },
            {
                "a4": "Incorrect. Implementing all possible security controls is not a practical or effective way to address all threats. Prioritization is necessary to focus resources on the most critical threats."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Data governance and data privacy",
        "level": "intermediate",
        "question": "What is the difference between data governance and data management?",
        "answers": [
            {
                "a1": "Data governance refers to the overall management of data, while data management refers to the implementation of specific tools and procedures to manage data."
            },
            {
                "a2": "Data governance refers to the implementation of specific tools and procedures to manage data, while data management refers to the overall management of data."
            },
            {
                "a3": "Data governance and data management are the same thing."
            },
            {
                "a4": "None of the above"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Data governance refers to the overall management of data, including policies, procedures, and roles and responsibilities, while data management refers to the implementation of specific tools and procedures to manage data, including data quality, data integration, and data security."
            },
            {
                "a2": "Incorrect. This statement is the opposite of the correct answer."
            },
            {
                "a3": "Incorrect. This statement is completely false."
            },
            {
                "a4": "Incorrect. The correct answer is a) Data governance refers to the overall management of data, while data management refers to the implementation of specific tools and procedures to manage data."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Input and Output Architecture",
        "level": "beginner",
        "question": "What does input and output architecture define?",
        "answers": [
            {
                "a1": "How data is transferred, processed and displayed across different devices"
            },
            {
                "a2": "The design and functionality of a computer system's communication between its peripherals and internal components"
            },
            {
                "a3": "The way a computer processes data"
            },
            {
                "a4": "The type of data that is processed"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. This describes part of what input and output architecture defines, but not all of it."
            },
            {
                "a2": "Correct. This is the main definition for input and output architecture."
            },
            {
                "a3": "Incorrect. This is not a complete definition for input and output architecture."
            },
            {
                "a4": "Incorrect. This is not a complete definition for input and output architecture."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Open design",
        "level": "expert",
        "question": "How can open design contribute to sustainable architecture?",
        "answers": [
            {
                "a": "Encourages the use of sustainable materials and construction techniques."
            },
            {
                "b": "Incorporates feedback from end-users to ensure that buildings meet their needs and reduce waste."
            },
            {
                "c": "Leads to the creation of buildings that are more energy-efficient and environmentally friendly."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Correct. Open design encourages the use of sustainable materials and construction techniques, resulting in buildings that have a lower environmental impact."
            },
            {
                "b": "Correct. Incorporating feedback from end-users ensures that buildings meet their needs, reducing the likelihood of unnecessary waste or redesign."
            },
            {
                "c": "Correct. Open design can lead to more energy-efficient and environmentally friendly buildings by prioritizing sustainability and encouraging innovation."
            },
            {
                "d": "Correct. All of the options contribute to the creation of sustainable architecture through open design."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Managing and treating risk",
        "level": "advanced",
        "question": "What is the purpose of a risk matrix?",
        "answers": [
            {
                "a1": "To identify and prioritize risks according to likelihood and severity"
            },
            {
                "a2": "To develop contingency plans for all possible risks"
            },
            {
                "a3": "To assess the impact of a risk event after it has occurred"
            },
            {
                "a4": "To outsource risk management to a third-party provider"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. A risk matrix is a tool used to identify and prioritize risks according to likelihood and severity."
            },
            {
                "a2": "Incorrect. While contingency plans may be developed based on the results of a risk matrix, that is not the primary purpose of the tool."
            },
            {
                "a3": "Incorrect. A risk matrix is used to assess potential risks, not events that have already occurred."
            },
            {
                "a4": "Incorrect. A risk matrix is an internal tool used by organizations themselves, not a third-party service."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Penetration testing",
        "level": "beginner",
        "question": "Which tool is used in penetration testing to identify open ports and services running on target machines?",
        "answers": [
            "nmap",
            "sqlmap",
            "metasploit",
            "John the Ripper"
        ],
        "correct_answer": "nmap",
        "explanations": [
            {
                "nmap": "Correct. Nmap is a popular tool used in penetration testing to identify open ports and services running on target machines."
            },
            {
                "sqlmap": "Incorrect. SQLmap is used for SQL injection attacks."
            },
            {
                "metasploit": "Incorrect. Metasploit is a penetration testing framework used for exploiting vulnerabilities in a system."
            },
            {
                "John the Ripper": "Incorrect. John the Ripper is used for password cracking."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Fail secure - Fail safe",
        "level": "expert",
        "question": "How can a security architect implement both fail secure and fail safe approaches in a single security system?",
        "answers": [
            {
                "a1": "By using separate systems for fail secure and fail safe components"
            },
            {
                "a2": "By using integrated systems that combine fail secure and fail safe approaches"
            },
            {
                "a3": "By prioritizing either fail secure or fail safe over the other"
            },
            {
                "a4": "By only implementing fail secure or fail safe, but not both"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Separating fail secure and fail safe components may create complexities in managing the system and could lead to gaps in security."
            },
            {
                "a2": "Correct. Integrated systems that combine both approaches can provide a comprehensive and efficient solution with the benefits of each approach."
            },
            {
                "a3": "Incorrect. Prioritizing one approach over the other may not provide the best solution for the security system as a whole."
            },
            {
                "a4": "Incorrect. Ignoring either fail secure or fail safe can leave the security system vulnerable. A comprehensive approach should consider both."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Social Media Safety",
        "level": "expert",
        "question": "What is social engineering and how can it be used to steal information on social media?",
        "answers": [
            {
                "a": "Social engineering refers to the use of technology to manipulate social interactions and gain access to information, and can be used to deceive users into revealing personal information or taking actions that benefit the attacker."
            },
            {
                "b": "Social engineering is a hacking technique that involves exploiting vulnerabilities in software or network systems, and can be used to gain access to social media accounts."
            },
            {
                "c": "Social engineering is a term for using bots or automated systems to interact with social media users and collect large amounts of data."
            },
            {
                "d": "Social engineering is a type of attack that relies on physical access to a device, and can be used to gain access to social media credentials."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Social engineering is a tactic that relies on the manipulation of human behavior to reveal sensitive information or perform actions that benefit the attacker."
            },
            {
                "b": "Incorrect. While social engineering can be used to target software vulnerabilities, it does not specifically involve hacking or exploiting network systems."
            },
            {
                "c": "Incorrect. Using bots or automated systems to collect data is a separate tactic known as data scraping."
            },
            {
                "d": "Incorrect. Gaining physical access to a device is a separate tactic known as shoulder surfing, and does not specifically relate to social media."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Workplace Security",
        "level": "advanced",
        "question": "Which of the following is a common method of social engineering used in cybersecurity attacks?",
        "answers": [
            {
                "a": "Phishing"
            },
            {
                "b": "Spearphishing"
            },
            {
                "c": "Vishing"
            },
            {
                "d": "All of the above"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Partially correct. Phishing is a common method of social engineering, which involves tricking individuals into clicking on links or providing sensitive information."
            },
            {
                "b": "Partially correct. Spearphishing is a more targeted form of phishing that involves researching and customizing the attack to a specific individual or group."
            },
            {
                "c": "Partially correct. Vishing is another form of phishing that involves using voice or phone calls to deceive individuals into providing sensitive information."
            },
            {
                "d": "Correct. All of the options listed are common methods of social engineering used in cybersecurity attacks."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Errors, Logging and Auditing Architecture",
        "level": "beginner",
        "question": "What is the purpose of Errors, Logging and Auditing Architecture?",
        "answers": [
            {
                "a": "To identify and record failures within a system"
            },
            {
                "b": "To generate reports for quarterly compliance audits"
            },
            {
                "c": "To design the overall system architecture"
            },
            {
                "d": "To implement new software updates"
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Errors, Logging and Auditing Architecture is the framework used to identify and record failures within a system."
            },
            {
                "b": "Incorrect. Errors, Logging and Auditing Architecture is not used for generating reports for quarterly compliance audits."
            },
            {
                "c": "Incorrect. Errors, Logging and Auditing Architecture is not used for designing the overall system architecture."
            },
            {
                "d": "Incorrect. Errors, Logging, and Auditing Architecture is not used for implementing new software updates."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Incident Response",
        "level": "advanced",
        "question": "What is the purpose of a tabletop exercise in incident response planning?",
        "answers": [
            {
                "a1": "To simulate a real-world incident and evaluate the effectiveness of the response plan and procedures."
            },
            {
                "a2": "To train security analysts on the use of incident response tools and techniques."
            },
            {
                "a3": "To test the resilience of the IT infrastructure against cyber attacks."
            },
            {
                "a4": "To review the incident response plan and update it with new findings and lessons learned."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Tabletop exercises are simulations of real-world incidents that can help organizations evaluate their incident response plans, procedures, and communication channels."
            },
            {
                "a2": "Incorrect. Tabletop exercises are not meant to be training sessions, but rather simulations of actual incidents for the purpose of assessing and improving the incident response capabilities of the organization."
            },
            {
                "a3": "Incorrect. Tabletop exercises do not test the resilience of the IT infrastructure, but rather the preparedness and effectiveness of the incident response team and the response plan."
            },
            {
                "a4": "Incorrect. While tabletop exercises can help identify gaps and areas for improvement in the incident response plan, their main purpose is to simulate and evaluate the response to a real-world incident."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Social Engineering",
        "level": "beginner",
        "question": "What is social engineering?",
        "answers": [
            {
                "a1": "A way to bypass security measures by targeting system vulnerabilities."
            },
            {
                "a2": "A manipulative technique used to deceive people into divulging confidential information."
            },
            {
                "a3": "A method to encrypt confidential information."
            },
            {
                "a4": "A way to hack into a computer system using brute force."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Social engineering targets human vulnerabilities rather than system vulnerabilities to bypass security measures."
            },
            {
                "a2": "Correct. Social engineering is a manipulative technique used to deceive people into divulging confidential information, perform an action, or compromise a system."
            },
            {
                "a3": "Incorrect. Encryption is a technique to transform data into a secret code to prevent unauthorized access."
            },
            {
                "a4": "Incorrect. Hacking into a system using brute force involves trying all possible combinations of login credentials until the right one is found."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "Understanding your system and environment",
        "level": "intermediate",
        "question": "What is the purpose of evaluating user roles and data classifications in threat modeling?",
        "answers": [
            {
                "a": "To reduce the likelihood of successful attacks"
            },
            {
                "b": "To identify and analyze potential risks that may arise due to system components"
            },
            {
                "c": "To make informed decisions about risk management"
            },
            {
                "d": "To understand and protect critical assets"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Incorrect. Evaluating user roles and data classifications is important for protecting critical assets, but may not reduce the likelihood of successful attacks on its own."
            },
            {
                "b": "Incorrect. Analyzing potential risks due to system components is important, but user roles and data classifications are also vital components to consider."
            },
            {
                "c": "Incorrect. Making informed decisions about risk management may involve evaluating user roles and data classifications, but they serve a direct purpose in threat modeling beyond risk management."
            },
            {
                "d": "Correct. Evaluating user roles and data classifications is important to understand and protect critical assets, which is a primary goal of threat modeling."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Defense in depth",
        "level": "beginner",
        "question": "What is Defense in Depth?",
        "answers": [
            {
                "a": "A security measure that uses only one line of defense."
            },
            {
                "b": "A security measure that uses multiple line of defense to protect against different types of attacks."
            },
            {
                "c": "A security measure that is not effective against potential threats."
            },
            {
                "d": "A security measure that uses encryption to protect data."
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Defense in depth involves multiple layers of security measures."
            },
            {
                "b": "Correct. Defense in depth is an architecture and concept that involves layered security measures to protect against different types of attacks."
            },
            {
                "c": "Incorrect. Defense in depth is an effective security measure."
            },
            {
                "d": "Incorrect. Encryption is just one of the possible measures in a defense in depth approach."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Safe Internet Usage",
        "level": "beginner",
        "question": "What is the best practice for creating a secure password?",
        "answers": [
            {
                "a1": "Use a simple word or phrase"
            },
            {
                "a2": "Use personal information like your birthdate"
            },
            {
                "a3": "Use a combination of letters, numbers, and symbols"
            },
            {
                "a4": "Use the same password for multiple accounts"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Simple words or phrases are easy to guess."
            },
            {
                "a2": "Incorrect. Personal information can be easily found online or through social engineering."
            },
            {
                "a3": "Correct. A combination of letters, numbers, and symbols makes it harder to guess or crack a password."
            },
            {
                "a4": "Incorrect. Using the same password for multiple accounts makes all of them vulnerable if one account is compromised."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Remote Work Security",
        "level": "advanced",
        "question": "Which access control policy would be the most effective for remote workers who need to access sensitive company data?",
        "answers": [
            {
                "a1": "Multi-factor authentication"
            },
            {
                "a2": "Single sign-on"
            },
            {
                "a3": "Password sharing"
            },
            {
                "a4": "Guest accounts with limited access"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Multi-factor authentication requires users to provide two or more pieces of evidence to verify their identity, making it one of the most effective access control policies."
            },
            {
                "a2": "Partially correct. Single sign-on can make remote work easier but it is not the most secure access control policy."
            },
            {
                "a3": "Incorrect. Password sharing is not secure and should be avoided."
            },
            {
                "a4": "Incorrect. Guest accounts with limited access are useful for non-employees, but they should not be used for remote workers who need to access sensitive company data."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Managing and treating risk",
        "level": "beginner",
        "question": "What is the purpose of developing contingency plans?",
        "answers": [
            {
                "a1": "To identify potential risks"
            },
            {
                "a2": "To invest in insurance policies"
            },
            {
                "a3": "To mitigate the impact of unforeseen events"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Developing contingency plans come after identifying potential risks."
            },
            {
                "a2": "Incorrect. Developing contingency plans may or may not involve investing in insurance policies."
            },
            {
                "a3": "Correct. Contingency plans are developed to mitigate the impact of unforeseen events."
            },
            {
                "a4": "Incorrect. While contingency plans may include all of the above, that is not their primary purpose."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Supply Chain Vulnerabilities",
        "level": "expert",
        "question": "How can companies manage cyber threats in the supply chain?",
        "answers": [
            {
                "a1": "Use secure communication channels"
            },
            {
                "a2": "Implement IT security best practices"
            },
            {
                "a3": "Regularly update and patch software and systems"
            },
            {
                "a4": "All of the above"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Using secure communication channels can help reduce the risk of cyber attacks in the supply chain."
            },
            {
                "a2": "Correct. Implementing IT security best practices, such as access controls, can help reduce the risk of cyber attacks in the supply chain."
            },
            {
                "a3": "Correct. Regularly updating and patching software and systems can help reduce the risk of cyber attacks in the supply chain."
            },
            {
                "a4": "Correct. Using secure communication channels, implementing IT security best practices, and regularly updating and patching software and systems can all help companies manage cyber threats in the supply chain."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Business Logic Architecture",
        "level": "intermediate",
        "question": "What is the purpose of business rules in Business Logic Architecture?",
        "answers": [
            {
                "a1": "To clarify business processes and systems."
            },
            {
                "a2": "To manage stakeholder relationships."
            },
            {
                "a3": "To ensure consistency and accuracy in software behavior and decision-making capabilities."
            },
            {
                "a4": "To identify inefficiencies in business operations."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Business rules are not meant to clarify business processes and systems."
            },
            {
                "a2": "Incorrect. Business rules are not meant to manage stakeholder relationships."
            },
            {
                "a3": "Correct. Business rules ensure consistency and accuracy in software behavior and decision-making capabilities by guiding how the software system should handle data and transactions."
            },
            {
                "a4": "Incorrect. Business rules are not meant to identify inefficiencies in business operations."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Architecture assessment",
        "level": "expert",
        "question": "Which technique is used in architecture assessment to analyze the system's behavior under different operating conditions?",
        "answers": [
            {
                "a1": "Modeling and simulation"
            },
            {
                "a2": "Fault trees"
            },
            {
                "a3": "Fault injection"
            },
            {
                "a4": "Performance analysis"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Modeling and simulation techniques are used in architecture assessment to analyze the system's behavior under different operating conditions."
            },
            {
                "a2": "Fault trees technique is used for safety and quality analysis, but it is not directly related to architecture assessment."
            },
            {
                "a3": "Fault injection technique is used for testing and debugging purposes, but it is not directly related to architecture assessment."
            },
            {
                "a4": "Performance analysis technique is used to evaluate the software’s responsiveness and speed, but it is not directly related to architecture assessment."
            }
        ]
    },
    {
        "topic": "Offensive Awareness",
        "category": "Smishing",
        "level": "beginner",
        "question": "What is Smishing?",
        "answers": [
            {
                "a1": "A form of phishing scam that uses SMS or text messages to deceive people into giving away sensitive information."
            },
            {
                "a2": "A form of scam that uses fake social media profiles to obtain sensitive information."
            },
            {
                "a3": "A form of scam that uses email to deceive people into giving away sensitive information."
            },
            {
                "a4": "A form of scam that uses phone calls to deceive people into giving away sensitive information."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Smishing is a form of phishing that uses text messages to deceive people."
            },
            {
                "a2": "Incorrect. This is a description of social engineering."
            },
            {
                "a3": "Incorrect. This is a description of phishing."
            },
            {
                "a4": "Incorrect. This is a description of vishing."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Interactive Application Security Testing (IAST)",
        "level": "beginner",
        "question": "What is IAST?",
        "answers": [
            {
                "a": "A tool for security testing during runtime."
            },
            {
                "b": "A tool for security testing during coding."
            },
            {
                "c": "A tool for security testing during deployment."
            },
            {
                "d": "A tool for security testing during design."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct! IAST is a tool for real-time security testing during runtime, which helps detect and prevent possible vulnerabilities."
            },
            {
                "b": "Incorrect. IAST is a tool for real-time security testing during runtime, not coding."
            },
            {
                "c": "Incorrect. IAST is a tool for real-time security testing during runtime, not deployment."
            },
            {
                "d": "Incorrect. IAST is a tool for real-time security testing during runtime, not design."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Architecture assessment",
        "level": "beginner",
        "question": "What is the purpose of architecture assessment in software development?",
        "answers": [
            {
                "a1": "To evaluate the feasibility of the project."
            },
            {
                "a2": "To analyze the system's architecture from different perspectives."
            },
            {
                "a3": "To develop the functional requirements of the software."
            },
            {
                "a4": "To test the software code for errors."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Feasibility analysis is a different stage in software development."
            },
            {
                "a2": "Correct. Architecture assessment helps evaluate the software’s design from several angles to ensure it meets desired quality attributes."
            },
            {
                "a3": "Incorrect. Functional requirements development is another stage in the software development lifecycle."
            },
            {
                "a4": "Incorrect. Code testing is another stage in software development."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Risk, threats, and vulnerabilities",
        "level": "advanced",
        "question": "What is the difference between risk and a vulnerability?",
        "answers": [
            {
                "a1": "A vulnerability is the likelihood that a threat actor will compromise a system, while risk is the potential impact or harm of that compromise."
            },
            {
                "a2": "A vulnerability is the potential for a weak point in security, while risk is the probability that the weakness will be exploited."
            },
            {
                "a3": "A vulnerability and risk are the same thing."
            },
            {
                "a4": "A vulnerability is a potential danger, while risk is the likelihood of that danger occurring."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. A vulnerability refers to a weakness or gap in security, while risk is the potential impact or harm of a compromise."
            },
            {
                "a2": "Correct. A vulnerability is a potential weakness or gap in security, while risk is the probability or likelihood that the weakness will be exploited and the potential impact of that exploit."
            },
            {
                "a3": "Incorrect. A vulnerability and risk are distinct concepts."
            },
            {
                "a4": "Incorrect. A vulnerability is not a potential danger, but rather a potential weakness or gap in security."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Information Security",
        "level": "advanced",
        "question": "What is a firewall?",
        "answers": [
            {
                "a": "A software application that protects a computer from malware."
            },
            {
                "b": "A device that prevents unauthorized access to a computer network."
            },
            {
                "c": "A type of encryption used to secure data."
            },
            {
                "d": "A tool used to scan and remove viruses from a computer."
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. A firewall is not a software application that specifically protects against malware."
            },
            {
                "b": "Correct. A firewall is a device that prevents unauthorized access to a computer network."
            },
            {
                "c": "Incorrect. Encryption is used to protect data, but a firewall is not a type of encryption."
            },
            {
                "d": "Incorrect. A firewall is not used to scan and remove viruses; that is the job of antivirus software."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Identity Theft Prevention",
        "level": "advanced",
        "question": "Which of the following is NOT a recommended way to safeguard sensitive documents?",
        "answers": [
            {
                "a1": "Storing the documents in a locked cabinet"
            },
            {
                "a2": "Using encryption software to protect digital files"
            },
            {
                "a3": "Sharing the documents with trusted friends or family members"
            },
            {
                "a4": "Shredding the documents when no longer needed"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Correct. Storing sensitive documents in a locked cabinet can help prevent them from being accessed by unauthorized individuals."
            },
            {
                "a2": "Correct. Using encryption software can help protect digital files from being stolen or hacked."
            },
            {
                "a3": "Incorrect. Sharing sensitive documents with others, even trusted individuals, can increase the risk of the information being compromised."
            },
            {
                "a4": "Correct. Shredding documents when no longer needed ensures that the information cannot be retrieved or used maliciously."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Secure Software Development Lifecycle",
        "level": "expert",
        "question": "What are the different phases of SSDL?",
        "answers": [
            {
                "a1": "Planning, Design, Coding, Testing, Deployment, and Maintenance"
            },
            {
                "a2": "Analysis, Planning, Design, Development, Testing, Deployment, and Maintenance"
            },
            {
                "a3": "Requirements, Planning, Design, Development, Testing, Deployment, and Maintenance"
            },
            {
                "a4": "Requirements, Analysis, Design, Development, Testing, Deployment, and Maintenance"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. This answer is missing the requirements and analysis phases."
            },
            {
                "a2": "Incorrect. This answer includes an analysis phase, which is not typically included in SSDL."
            },
            {
                "a3": "Incorrect. This answer is missing the analysis phase."
            },
            {
                "a4": "Correct! The different phases of SSDL are requirements, analysis, design, development, testing, deployment, and maintenance."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Communications Architecture",
        "level": "advanced",
        "question": "What is the OSI model and how does it relate to communications architecture?",
        "answers": [
            {
                "a1": "The OSI model is a networking model that defines how data is transmitted over a network, and it is an important part of communications architecture."
            },
            {
                "a2": "The OSI model is a security protocol used to protect data during transmission."
            },
            {
                "a3": "The OSI model is a type of network architecture used for large-scale enterprise networks."
            },
            {
                "a4": "The OSI model is a type of wireless technology used for local area networks."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. The Open Systems Interconnection (OSI) model is a framework that defines how data is transmitted over a network. It is an important part of communications architecture because it provides a standard for how communication systems can work together, which ensures interoperability and flexibility."
            },
            {
                "a2": "Incorrect. The OSI model is not a security protocol but includes security measures as a part of its framework."
            },
            {
                "a3": "Incorrect. The OSI model is not a type of network architecture but is a theoretical framework for how networks can work together."
            },
            {
                "a4": "Incorrect. The OSI model is not a type of wireless technology but is a framework for how communication occurs over a network."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Social Media Safety",
        "level": "advanced",
        "question": "Which setting can help limit the sharing of personal information on most social media platforms?",
        "answers": [
            {
                "a": "Two-factor authentication"
            },
            {
                "b": "Public profile visibility"
            },
            {
                "c": "Tagging review"
            },
            {
                "d": "Privacy settings for individual posts"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Incorrect. While two-factor authentication can help strengthen access control, it is not related to limiting the sharing of personal information."
            },
            {
                "b": "Incorrect. Public profile visibility relates to who can view a user's profile, not the sharing of personal information."
            },
            {
                "c": "Incorrect. Tagging review allows users to approve or reject tags in posts, but it is not related to limiting the sharing of personal information."
            },
            {
                "d": "Correct. Privacy settings for individual posts can help limit the sharing of personal information by controlling who can see each post."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "PASTA",
        "level": "intermediate",
        "question": "Which of the following is a PASTA analysis technique?",
        "answers": [
            {
                "a1": "Threat Hunting"
            },
            {
                "a2": "Threat Enumeration"
            },
            {
                "a3": "Threat Profiling"
            },
            {
                "a4": "Threat Scenarios"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Threat Hunting is not a PASTA analysis technique."
            },
            {
                "a2": "Incorrect. Threat Enumeration is not a PASTA analysis technique."
            },
            {
                "a3": "Incorrect. Threat Profiling is not a PASTA analysis technique."
            },
            {
                "a4": "Correct. Threat Scenarios is a PASTA analysis technique. It involves the creation of scenarios that simulate the techniques and tactics used by adversaries to attack software systems."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Static Application Security Testing (SAST)",
        "level": "intermediate",
        "question": "What is the difference between SAST and Dynamic Application Security Testing (DAST)?",
        "answers": [
            {
                "a1": "SAST analyzes source code, while DAST analyzes running applications"
            },
            {
                "a2": "SAST analyzes running applications, while DAST analyzes source code"
            },
            {
                "a3": "SAST and DAST both analyze source code and running applications"
            },
            {
                "a4": "SAST and DAST are the same thing"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. SAST evaluates source code for potential security risks, and DAST analyzes running applications to identify vulnerabilities."
            },
            {
                "a2": "Incorrect. SAST evaluates source code, while DAST analyzes running applications."
            },
            {
                "a3": "Incorrect. While both SAST and DAST analyze applications for security risks, SAST evaluates source code specifically, and DAST analyzes running applications."
            },
            {
                "a4": "Incorrect. SAST and DAST are two different categories of security testing tools with distinct purposes and methods."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Interactive Application Security Testing (IAST)",
        "level": "advanced",
        "question": "In what ways does IAST reduce the number of false positives compared to SAST and DAST?",
        "answers": [
            {
                "a": "IAST uses runtime data to identify specific code paths that are vulnerable and avoids generic false positives that can occur in SAST and DAST."
            },
            {
                "b": "IAST uses static analysis to analyze the application's source code and reduces false positives by analyzing the code's intent."
            },
            {
                "c": "IAST uses dynamic analysis to test the application's runtime and detects false positives generated by SAST and DAST."
            },
            {
                "d": "IAST does not reduce false positives compared to SAST and DAST."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct! IAST uses runtime data to identify specific code paths that are vulnerable, avoiding generic false positives that can occur in SAST and DAST."
            },
            {
                "b": "Incorrect. This describes the benefits of SAST, not IAST. IAST is concerned with runtime security testing, not static analysis."
            },
            {
                "c": "Incorrect. This describes the benefits of DAST, not IAST. IAST is concerned with real-time security testing, not dynamic analysis."
            },
            {
                "d": "Incorrect. IAST does reduce false positives compared to SAST and DAST by avoiding generic false positives that can occur with these techniques."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Security requirements",
        "level": "intermediate",
        "question": "Which of the following is an example of a security requirement for data protection?",
        "answers": [
            {
                "a1": "Allowing employees to use their personal email for company business"
            },
            {
                "a2": "Requiring passwords to be at least 20 characters long"
            },
            {
                "a3": "Allowing guests to connect to the company Wi-Fi without a password"
            },
            {
                "a4": "Requiring employees to use their personal laptop for company business"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect - Allowing personal email for company business could introduce security risks, so this is not an example of a security requirement."
            },
            {
                "a2": "Correct - Requiring long passwords is an example of a security requirement to protect data from unauthorized access."
            },
            {
                "a3": "Incorrect - Allowing guests to connect to the Wi-Fi without a password is not a good security practice, so this is not an example of a security requirement."
            },
            {
                "a4": "Incorrect - Requiring employees to use personal laptops is not likely to enhance security and is not a typical security requirement."
            }
        ]
    },
    {
        "topic": "Security Awareness",
        "category": "Physical Safety",
        "level": "advanced",
        "question": "What are the recommended steps to take during a fire emergency?",
        "answers": [
            {
                "a": "Find the nearest exit and leave the building"
            },
            {
                "b": "Use elevators to exit the building"
            },
            {
                "c": "Ignore the alarm and continue working"
            },
            {
                "d": "None of the above"
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct! During a fire emergency, it's important to find the nearest exit and leave the building immediately, without using elevators, and follow the emergency protocol that you are trained for to ensure your safety and others as well."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Cryptographic Architecture",
        "level": "advanced",
        "question": "What is an important component of Cryptographic Architecture?",
        "answers": [
            {
                "a": "Key management."
            },
            {
                "b": "Firewall configuration."
            },
            {
                "c": "System performance."
            },
            {
                "d": "User interface."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Key management is an important component of Cryptographic Architecture."
            },
            {
                "b": "Incorrect. This is not an important component of Cryptographic Architecture."
            },
            {
                "c": "Incorrect. This is not an important component of Cryptographic Architecture."
            },
            {
                "d": "Incorrect. This is not an important component of Cryptographic Architecture."
            }
        ]
    },
    {
        "topic": "Tools and techniques",
        "category": "Security logging and monitoring",
        "level": "advanced",
        "question": "What is the purpose of a Security Information and Event Management (SIEM) system?",
        "answers": [
            {
                "a1": "To collect, correlate, and analyze security-related data from various sources."
            },
            {
                "a2": "To replace traditional firewalls and antivirus software."
            },
            {
                "a3": "To monitor network traffic for anomalies."
            },
            {
                "a4": "To create backups of critical data."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. A SIEM system is designed to collect, correlate, and analyze data from various sources in order to detect and respond to potential security threats."
            },
            {
                "a2": "Incorrect. A SIEM system is not meant to replace firewalls and antivirus software, but rather to supplement and enhance their effectiveness."
            },
            {
                "a3": "Incorrect. While monitoring network traffic is a key component of security logging and monitoring, it is not the sole purpose of a SIEM system."
            },
            {
                "a4": "Incorrect. While creating backups of critical data is important to data security, it is not the primary purpose of a SIEM system."
            }
        ]
    },
    {
        "topic": "Threat Modeling",
        "category": "Understanding your system and environment",
        "level": "expert",
        "question": "How can a business evaluate the security posture of their system and environment in order to effectively manage risk?",
        "answers": [
            {
                "a": "By analyzing potential risks due to system components only"
            },
            {
                "b": "By evaluating their vulnerability to known attacks and vulnerabilities"
            },
            {
                "c": "By conducting penetration testing on a regular basis"
            },
            {
                "d": "By understanding their system and environment as a whole, identifying potential risks, and implementing appropriate controls and countermeasures"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Incorrect. Analyzing potential risks due to system components is only one aspect of evaluating a security posture."
            },
            {
                "b": "Incorrect. Evaluating the vulnerability to known attacks and vulnerabilities is necessary, but not sufficient to evaluate a security posture."
            },
            {
                "c": "Incorrect. Penetration testing is a useful tool, but alone will not provide a comprehensive evaluation of a security posture."
            },
            {
                "d": "Correct. Understanding the system and environment as a whole is necessary to evaluate a security posture, and implementing appropriate controls and countermeasures to address identified risks is crucial for effective risk management."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Microservice Architectures",
        "level": "expert",
        "question": "What is the role of an API gateway in a microservice architecture?",
        "answers": [
            {
                "a1": "To manage access control among different services"
            },
            {
                "a2": "To provide a single entry point for external requests"
            },
            {
                "a3": "To translate data format between services"
            },
            {
                "a4": "To monitor the health of all the services"
            }
        ],
        "correct_answer": [
            "a1",
            "a2",
            "a3"
        ],
        "explanations": [
            {
                "a1": "Correct. The API gateway helps to control access and ensure there are no unauthorized activities in the microservice architecture. It routes requests to the appropriate microservice and translates those requests if necessary."
            },
            {
                "a2": "Correct. The API gateway serves as the single entry point into the microservice architecture and routes requests to their appropriate service. It also handles load balancing and rate limiting for incoming requests."
            },
            {
                "a3": "Correct. If services use different data formats or protocols, the API gateway can perform data mapping and transformation to ensure both communication and data exchange are successful."
            },
            {
                "a4": "Incorrect. Although monitoring is important in a microservice architecture, the API gateway is not primarily responsible for it. Monitoring typically falls under the responsibility of a service mesh or observability tool."
            }
        ]
    },
    {
        "topic": "Tools and Techniques",
        "category": "Penetration testing",
        "level": "expert",
        "question": "Which of the following is an exploit framework commonly used by penetration testers to gain access to a system?",
        "answers": [
            "Cobalt Strike",
            "Maltego",
            "Nikto",
            "Aircrack-ng"
        ],
        "correct_answer": "Cobalt Strike",
        "explanations": [
            {
                "Cobalt Strike": "Correct. Cobalt Strike is a popular exploit framework used by penetration testers to gain access to systems and simulate an attack."
            },
            {
                "Maltego": "Incorrect. Maltego is a tool used for information gathering and network mapping."
            },
            {
                "Nikto": "Incorrect. Nikto is a web server scanner used for vulnerability scanning."
            },
            {
                "Aircrack-ng": "Incorrect. Aircrack-ng is a network software suite used for penetration testing."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Managing and treating risk",
        "level": "intermediate",
        "question": "Which of the following is an example of a proactive measure to reduce exposure to risk?",
        "answers": [
            {
                "a1": "Purchasing insurance after a catastrophic event"
            },
            {
                "a2": "Implementing regular safety training for employees"
            },
            {
                "a3": "Reacting to a cyber attack after the fact"
            },
            {
                "a4": "Assigning blame for a workplace accident"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Purchasing insurance after the event is reactive, not proactive."
            },
            {
                "a2": "Correct. Regular safety training is a proactive measure to reduce exposure to risk."
            },
            {
                "a3": "Incorrect. Reacting to an event after the fact is reactive, not proactive."
            },
            {
                "a4": "Incorrect. Assigning blame does not necessarily reduce exposure to risk, and may in fact exacerbate it by creating a culture of fear and blame-shifting."
            }
        ]
    },
    {
        "topic": "OWASP Top 10",
        "category": "Total Overview",
        "level": "intermediate",
        "question": "Which of the following best describes Security Misconfiguration?",
        "answers": [
            {
                "a1": "The use of components with known vulnerabilities that are not properly patched or updated"
            },
            {
                "a2": "The failure to restrict authenticated users from unauthorized actions, features or data"
            },
            {
                "a3": "The lack of proper access control over sensitive data, such as customer or employee information"
            },
            {
                "a4": "The improper or incomplete implementation of security measures, in order to disable functionality or improve performance"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. The use of components with known vulnerabilities is part of the A9-Using Components with Known Vulnerabilities - in the OWASP Top 10."
            },
            {
                "a2": "Incorrect. Failure to restrict access is part of A2-Broken Authentication and Session Management."
            },
            {
                "a3": "Incorrect. Lack of access control is part of A5-Sensitive Data Exposure."
            },
            {
                "a4": "Correct. Security misconfiguration refers to the weak configuration of security measures, such as the use of default accounts and passwords, exposed error messages, open debugging or QA tools, unnecessary services running, or improper file and directory permissions. These misconfigurations can give an attacker easy access to sensitive data or critical system resources."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Social Engineering",
        "level": "intermediate",
        "question": "What is pretexting in social engineering?",
        "answers": [
            {
                "a1": "A technique used to lure victims into providing sensitive information by offering them a reward."
            },
            {
                "a2": "A technique used to impersonate a trusted party to gain access to personal information."
            },
            {
                "a3": "A technique used to exploit trust by pretending to need help in order to obtain sensitive information."
            },
            {
                "a4": "A technique used to deceive victims into clicking on a malicious link or downloading a malicious attachment."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. Baiting is a technique used to lure victims into providing sensitive information by offering them a reward."
            },
            {
                "a2": "Incorrect. Phishing is a technique used to impersonate a trusted party to gain access to personal information."
            },
            {
                "a3": "Correct. Pretexting is a technique used to exploit trust by pretending to need help in order to obtain sensitive information."
            },
            {
                "a4": "Incorrect. This is an example of a phishing technique called spear-phishing."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Impersonation Fraud",
        "level": "intermediate",
        "question": "What is a common method used by perpetrators of impersonation fraud?",
        "answers": [
            {
                "a1": "Sending phishing emails"
            },
            {
                "a2": "Hacking into a victim's bank account"
            },
            {
                "a3": "Stealing credit card information from a store"
            },
            {
                "a4": "Stealing money from a victim's wallet"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Perpetrators of impersonation fraud typically use methods like phishing emails to trick victims into providing personal information or funds."
            },
            {
                "a2": "Incorrect. Hacking into a bank account is not impersonation fraud, but rather another method of cyber crime."
            },
            {
                "a3": "Incorrect. This is a type of credit card fraud, but not impersonation fraud specifically."
            },
            {
                "a4": "Incorrect. Stealing directly from a victim's wallet is not impersonation fraud."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Information Security",
        "level": "expert",
        "question": "What is a zero-day exploit?",
        "answers": [
            {
                "a1": "An attack that takes place on the zeroth day of the month."
            },
            {
                "a2": "A vulnerability in a system or software that is known only to the attacker."
            },
            {
                "a3": "An exploit that can be used to take advantage of a known vulnerability in the software or system."
            },
            {
                "a4": "A software vulnerability that has reached day 0 of its lifecycle."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. The term \"zero-day\" has nothing to do with the timing of the attack during the month."
            },
            {
                "a2": "Correct. A zero-day exploit is a vulnerability in a system or software that is known only to the attacker and has not been publicly disclosed or patched. This makes it very difficult to defend against such attacks as there is no known solution or patch available to mitigate the exploit."
            },
            {
                "a3": "Incorrect. A known vulnerability in software or system is not classified as a zero-day exploit."
            },
            {
                "a4": "Incorrect. The lifecycle of software vulnerabilities has no relation to the term \"zero-day.\""
            }
        ]
    },
    {
        "topic": "General",
        "category": "Password Security",
        "level": "expert",
        "question": "What is a password blacklist?",
        "answers": [
            {
                "a1": "A list of strong, recommended passwords."
            },
            {
                "a2": "A list of commonly used, easily guessable passwords that should not be used."
            },
            {
                "a3": "A list of websites that have been found to have weak security."
            },
            {
                "a4": "A list of usernames that have been compromised in data breaches."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. While there may be lists of recommended passwords, a password blacklist is not one of them."
            },
            {
                "a2": "Correct. A password blacklist is a list of commonly used, easily guessable passwords that should not be used."
            },
            {
                "a3": "Incorrect. While website security is important for password security, a password blacklist is not a list of websites."
            },
            {
                "a4": "Incorrect. A list of compromised usernames would not be considered a password blacklist."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Malicious Software Architecture",
        "level": "beginner",
        "question": "What is malicious software architecture characterized by?",
        "answers": [
            {
                "a1": "Visually appealing user interface"
            },
            {
                "a2": "Hidden or disguised features"
            },
            {
                "a3": "Open source code"
            },
            {
                "a4": "Strict compliance with programming standards"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Malicious software doesn't need to have a visually appealing user interface."
            },
            {
                "a2": "Correct. Malicious software architecture is characterized by hidden or disguised features, such as Trojan horses, worms, viruses and ransomware, which are designed to exploit vulnerabilities in computer systems and steal or destroy data."
            },
            {
                "a3": "Incorrect. Malicious software can be open source or closed source."
            },
            {
                "a4": "Incorrect. Malicious software can violate programming standards and still be functional in causing harm."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Cyber Fundamentals",
        "level": "intermediate",
        "question": "What is encryption used for in cybersecurity?",
        "answers": [
            {
                "a": "Sending large files over the internet"
            },
            {
                "b": "Protecting data from unauthorized access"
            },
            {
                "c": "Hiding your online identity"
            },
            {
                "d": "Removing malware from a computer"
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Large files can be sent over the internet without encryption, but doing so may pose a security risk."
            },
            {
                "b": "Correct. Encryption is the process of encoding data so that only authorized parties can read it. This technology can be used to protect sensitive information from cybercriminals and other unauthorized third parties."
            },
            {
                "c": "Incorrect. Encryption does not hide your online identity, but using a virtual private network (VPN) could help you achieve this."
            },
            {
                "d": "Incorrect. Encryption is not used to remove malware, but antivirus software and other cybersecurity tools can help with this task."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Cryptographic Architecture",
        "level": "intermediate",
        "question": "What are the factors that Cryptographic Architecture must consider?",
        "answers": [
            {
                "a": "Key management, authentication, and encryption strength."
            },
            {
                "b": "Password management, firewall configuration, and device backup."
            },
            {
                "c": "Network traffic, system performance, and data storage."
            },
            {
                "d": "User interface, software compatibility, and file sharing."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Cryptographic Architecture must consider factors such as key management, authentication, and encryption strength."
            },
            {
                "b": "Incorrect. These are not the factors that Cryptographic Architecture must consider."
            },
            {
                "c": "Incorrect. These are not the factors that Cryptographic Architecture must consider."
            },
            {
                "d": "Incorrect. These are not the factors that Cryptographic Architecture must consider."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "API Architecture",
        "level": "advanced",
        "question": "What is API versioning?",
        "answers": [
            {
                "a1": "The process of creating documentation for an API."
            },
            {
                "a2": "The act of defining a new version of an API as changes are made."
            },
            {
                "a3": "The process of deprecating and removing old versions of an API."
            },
            {
                "a4": "The use of different types of APIs for different purposes."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. API versioning is not related to documentation."
            },
            {
                "a2": "Correct! API versioning is the act of defining a new version of an API as changes are made."
            },
            {
                "a3": "Incorrect. API versioning includes the ability to deprecate and remove old versions, but it is not the sole focus."
            },
            {
                "a4": "Incorrect. API versioning isn't about using different types of APIs, but rather about creating and managing different versions of a single API."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Security culture and shift-left",
        "level": "beginner",
        "question": "What is security culture?",
        "answers": [
            {
                "a": "A workplace environment where security is not a priority"
            },
            {
                "b": "A workplace environment where everyone takes responsibility for security"
            },
            {
                "c": "A workplace environment where employees are not trained on security risks"
            },
            {
                "d": "A workplace environment where employees are not held accountable for security breaches"
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Security culture involves making security a priority in the workplace."
            },
            {
                "b": "Correct. Security culture involves creating a workplace environment where everyone takes responsibility for security."
            },
            {
                "c": "Incorrect. Employees should be trained on security risks to create a strong security culture."
            },
            {
                "d": "Incorrect. Employees should be held accountable for security breaches to create a strong security culture."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Fail secure - Fail safe",
        "level": "beginner",
        "question": "What is the difference between fail secure and fail safe?",
        "answers": [
            {
                "a1": "Fail secure means that in the event of a power outage or system failure, the door or access point remains unlocked. Fail safe, on the other hand, means that in such situations, the door or access point automatically locks."
            },
            {
                "a2": "Fail secure means that in the event of a power outage or system failure, the door or access point remains locked. Fail safe, on the other hand, means that in such situations, the door or access point automatically unlocks."
            },
            {
                "a3": "Fail secure and fail safe mean the same thing."
            },
            {
                "a4": "Fail secure only applies to doors, whereas fail safe only applies to access points."
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. This is the opposite of what is described in the prompt."
            },
            {
                "a2": "Correct. This aligns with the description in the prompt."
            },
            {
                "a3": "Incorrect. Fail secure and fail safe have different meanings."
            },
            {
                "a4": "Incorrect. Fail secure and fail safe can apply to various components in a security system, not just doors or access points."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Data governance and data privacy",
        "level": "advanced",
        "question": "What are the principles of data protection by design and default?",
        "answers": [
            {
                "a1": "Transparency, accountability, and data minimization"
            },
            {
                "a2": "Privacy by default, privacy by design, and security by design"
            },
            {
                "a3": "Data protection impact assessments, data breach notifications, and consent management"
            },
            {
                "a4": "Access control, data classification, and data retention policies"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. These are some of the principles of data protection, but not specifically of data protection by design and default."
            },
            {
                "a2": "Correct. Data protection by design and default refers to the integration of privacy and data protection measures into the design of systems, processes, and products, from the outset of any project, and by default, ensuring that the highest possible privacy settings are the default settings. The principles include privacy by default, privacy by design, and security by design."
            },
            {
                "a3": "Incorrect. These are some of the measures associated with data protection, but not specifically with data protection by design and default."
            },
            {
                "a4": "Incorrect. These are some of the policies and measures associated with data governance and data security, but not specifically with data protection by design and default."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Session management",
        "level": "advanced",
        "question": "What are the advantages and disadvantages of using secure cookies for session management?",
        "answers": [
            {
                "a1": "They can be encrypted, but can still be vulnerable to attacks like cross-site scripting (XSS) and cross-site request forgery (CSRF)"
            },
            {
                "a2": "They can be used to store session data client-side, but can increase the risk of data theft"
            },
            {
                "a3": "They can be accessed via JavaScript, but not by other domains, limiting the risk of unauthorized access"
            },
            {
                "a4": "They can be set to expire after a certain time, but can still be vulnerable to replay attacks"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Secure cookies can be encrypted to improve security, but can still be vulnerable to attacks like XSS and CSRF."
            },
            {
                "a2": "Incorrect. Secure cookies are not primarily used for storing session data client-side, but rather for identifying and authenticating users."
            },
            {
                "a3": "Incorrect. Secure cookies can indeed be accessed by other domains through JavaScript, but they can also be vulnerable to other security risks."
            },
            {
                "a4": "Incorrect. Secure cookies can be set to expire after a certain time to improve security, but they are not vulnerable to replay attacks."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Session Management Architecture",
        "level": "intermediate",
        "question": "What is the purpose of session data in Session Management Architecture?",
        "answers": [
            {
                "a1": "To track user activity"
            },
            {
                "a2": "To store user account information"
            },
            {
                "a3": "To ensure secure communication between users and the system"
            },
            {
                "a4": "To maintain user session state across multiple requests"
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Incorrect. Session data is not only used to track user activity."
            },
            {
                "a2": "Incorrect. User account information is only a component of session data."
            },
            {
                "a3": "Incorrect. While secure communication is a goal of Session Management Architecture, it is not the purpose of session data."
            },
            {
                "a4": "Correct. One of the primary purposes of session data is to maintain user session state across multiple requests."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Business Logic Architecture",
        "level": "beginner",
        "question": "What does Business Logic Architecture refer to?",
        "answers": [
            {
                "a1": "The way in which software applications and systems are designed to incorporate business rules, policies, and logic into their functionality."
            },
            {
                "a2": "The programming language used for building software systems."
            },
            {
                "a3": "The process of testing software applications for bugs and errors."
            },
            {
                "a4": "The design of the physical components of a computer system."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Business Logic Architecture ensures that the software is aligned with the requirements and objectives of the organization, enabling it to perform its functions accurately, effectively, and securely by incorporating business rules, policies, and logic into their functionality."
            },
            {
                "a2": "Incorrect. Business Logic Architecture is not related to programming languages used for building software systems."
            },
            {
                "a3": "Incorrect. Business Logic Architecture is not a process of testing software applications for bugs and errors."
            },
            {
                "a4": "Incorrect. Business Logic Architecture is not related to the design of the physical components of a computer system."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Secure File Upload Architecture",
        "level": "advanced",
        "question": "What is a nonce in Secure File Upload Architecture?",
        "answers": [
            {
                "a1": "A random string used only once to protect against replay attacks"
            },
            {
                "a2": "A cryptographic hash that is used to encrypt the contents of the file"
            },
            {
                "a3": "A private key used to encrypt and decrypt files during transmission"
            },
            {
                "a4": "An authentication server that verifies the user's identity"
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. A nonce is a random string that is used only once to protect against replay attacks, where an attacker tries to re-transmit a previously intercepted message."
            },
            {
                "a2": "Incorrect. A cryptographic hash is a one-way function that is used to ensure the integrity of data, but not to encrypt files during transmission."
            },
            {
                "a3": "Incorrect. A private key is used in asymmetric cryptography, but not in Secure File Upload Architecture, which typically uses symmetric encryption."
            },
            {
                "a4": "Incorrect. An authentication server is used to verify a user's identity, but it is not related to nonce-based security measures."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Complete Mediation",
        "level": "advanced",
        "question": "Why is attention to detail critical when applying Complete Mediation in a design?",
        "answers": [
            {
                "a1": "The design will not function if it is not executed with precision."
            },
            {
                "a2": "The design will be too expensive if not enough detail is paid to it."
            },
            {
                "a3": "Complete Mediation designs are hard to execute, requiring a lot of detail work."
            },
            {
                "a4": "Without enough attention to detail, the space will not look aesthetically pleasing."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Because Complete Mediation involves linking all of the aspects of a design, careful planning and execution is necessary for the design to function properly."
            },
            {
                "a2": "Incorrect. The cost of the design is not directly affected if enough attention is not paid to the details."
            },
            {
                "a3": "Incorrect. Complete Mediation can be challenging, but it is the connection between the elements of the design that is important, not the detail work itself."
            },
            {
                "a4": "Incorrect. Although aesthetics is an important part of design, it is not the only reason that attention to detail is critical in Complete Mediation."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Safe Internet Usage",
        "level": "intermediate",
        "question": "What is a common phishing scam that tries to trick people into revealing their login credentials?",
        "answers": [
            {
                "a1": "Nigerian Prince scam"
            },
            {
                "a2": "Lottery scam"
            },
            {
                "a3": "Business email compromise"
            },
            {
                "a4": "Email spoofing"
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. The Nigerian Prince scam usually involves a request for money, not login credentials."
            },
            {
                "a2": "Incorrect. The Lottery scam usually involves a request for personal or financial information, not login credentials."
            },
            {
                "a3": "Correct. Business email compromise (BEC) scams often involve fraudulent emails that appear to be from a trusted source, such as a bank or employer, asking the recipient to reveal their login credentials or other sensitive information."
            },
            {
                "a4": "Incorrect, Email spoofing is a technique used to send fake emails that appear to be from someone else, but it does not necessarily involve a request for login credentials."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Account Takeover",
        "level": "intermediate",
        "question": "How do attackers typically obtain login credentials for account takeover?",
        "answers": [
            {
                "a": "Through phishing scams."
            },
            {
                "b": "Through social engineering."
            },
            {
                "c": "Through malware."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Correct. Attackers often use phishing scams to trick users into entering their login credentials."
            },
            {
                "b": "Correct. Attackers can use social engineering tactics to obtain login credentials as well."
            },
            {
                "c": "Correct. Malware can be used to steal login credentials."
            },
            {
                "d": "Correct. Attackers can use any or all of these methods to obtain login credentials."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Cyber Fundamentals",
        "level": "advanced",
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "answers": [
            {
                "a": "Symmetric encryption is faster but less secure than asymmetric encryption."
            },
            {
                "b": "Asymmetric encryption uses different keys for encryption and decryption, while symmetric encryption uses the same key for both."
            },
            {
                "c": "Symmetric encryption is used for data at rest, while asymmetric encryption is used for data in motion."
            },
            {
                "d": "Asymmetric encryption is common in enterprise environments, while symmetric encryption is more common in consumer applications."
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Asymmetric encryption is typically slower but more secure than symmetric encryption, as it uses a more complex key management system."
            },
            {
                "b": "Correct. Symmetric encryption uses the same key to encrypt and decrypt data, while asymmetric encryption uses a public key for encryption and a private key for decryption."
            },
            {
                "c": "Incorrect. Encryption algorithms can be used for both data at rest and data in motion, regardless of whether they are symmetric or asymmetric."
            },
            {
                "d": "Incorrect. Both symmetric and asymmetric encryption are used in a variety of contexts, from consumer messaging apps to enterprise data centers."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Password Security",
        "level": "intermediate",
        "question": "What is two-factor authentication?",
        "answers": [
            {
                "a1": "Using the same password for multiple accounts."
            },
            {
                "a2": "Providing a fingerprint to unlock a device."
            },
            {
                "a3": "Verifying identity through two methods, such as a password and a code sent to a mobile device."
            },
            {
                "a4": "Using a password manager to store passwords."
            }
        ],
        "correct_answer": "a3",
        "explanations": [
            {
                "a1": "Incorrect. A strong password should not be reused across accounts."
            },
            {
                "a2": "Incorrect. Providing a fingerprint is one method of authentication, but not two-factor authentication."
            },
            {
                "a3": "Correct. Two-factor authentication involves verifying identity through two methods, such as a password and a code sent to a mobile device."
            },
            {
                "a4": "Incorrect. While password managers are useful for password security, they are not two-factor authentication."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Supply Chain Vulnerabilities",
        "level": "beginner",
        "question": "What are supply chain vulnerabilities?",
        "answers": [
            {
                "a1": "Weaknesses that compromise the integrity and reliability of the supply chain."
            },
            {
                "a2": "Strengths that improve the efficiency of the supply chain."
            },
            {
                "a3": "Factors that optimize the supply chain operations."
            },
            {
                "a4": "None of the above."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. Supply chain vulnerabilities refer to weaknesses and risks that can compromise the integrity and reliability of the supply chain."
            },
            {
                "a2": "Incorrect. Supply chain vulnerabilities refer to weaknesses that compromise the integrity and reliability of the supply chain."
            },
            {
                "a3": "Incorrect. Supply chain vulnerabilities refer to weaknesses that compromise the integrity and reliability of the supply chain, not factors that optimize the operations."
            },
            {
                "a4": "Incorrect. Supply chain vulnerabilities exist and can lead to disruptions and financial losses if not addressed properly."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Errors, Logging and Auditing Architecture",
        "level": "advanced",
        "question": "Which of the following is not a type of log used in Errors, Logging, and Auditing Architecture?",
        "answers": [
            {
                "a": "Debug log"
            },
            {
                "b": "Database log"
            },
            {
                "c": "Audit log"
            },
            {
                "d": "Security log"
            },
            {
                "e": "All of the above are types of logs used in Errors, Logging, and Auditing Architecture"
            }
        ],
        "correct_answer": "b",
        "explanations": [
            {
                "a": "Incorrect. Debug log is a type of log used in Errors, Logging, and Auditing Architecture."
            },
            {
                "b": "Correct. Database log is not a type of log used in Errors, Logging, and Auditing Architecture."
            },
            {
                "c": "Incorrect. Audit log is a type of log used in Errors, Logging, and Auditing Architecture."
            },
            {
                "d": "Incorrect. Security log is a type of log used in Errors, Logging, and Auditing Architecture."
            },
            {
                "e": "Incorrect. Only option b is not a type of log used in Errors, Logging, and Auditing Architecture."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Social Engineering",
        "level": "expert",
        "question": "How can a company protect itself from social engineering attacks?",
        "answers": [
            {
                "a1": "By providing regular security awareness training to employees to help them recognize and prevent social engineering attempts."
            },
            {
                "a2": "By using two-factor authentication and other technical measures to reduce the risk of unauthorized access."
            },
            {
                "a3": "By implementing a robust incident response plan to quickly detect and respond to social engineering attacks."
            },
            {
                "a4": "All of the above."
            }
        ],
        "correct_answer": "a4",
        "explanations": [
            {
                "a1": "Correct. Regular security awareness training can help employees recognize and prevent social engineering attempts, which is an important part of protecting the company."
            },
            {
                "a2": "Correct. Using technical measures such as two-factor authentication can reduce the risk of unauthorized access and protect the company's assets and data."
            },
            {
                "a3": "Correct. A robust incident response plan can help the company quickly detect and respond to social engineering attacks, minimizing the damage and restoring normal operations."
            },
            {
                "a4": "Correct. All of the above measures can help a company protect itself from social engineering attacks."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Communications Architecture",
        "level": "expert",
        "question": "What is the difference between UDP and TCP and how are they used within communications architecture?",
        "answers": [
            {
                "a1": "UDP provides connectionless communication and is used for streaming data, while TCP provides reliable, ordered data transmission and is used for applications that require high reliability."
            },
            {
                "a2": "UDP provides reliable, ordered data transmission and is used for applications that require high reliability, while TCP provides connectionless communication and is used for streaming data."
            },
            {
                "a3": "UDP and TCP provide the same services and are interchangeable within communications architecture."
            },
            {
                "a4": "UDP and TCP are both used for wireless communication and have no relevance in wired networks."
            }
        ],
        "correct_answer": "a1",
        "explanations": [
            {
                "a1": "Correct. User Datagram Protocol (UDP) provides connectionless communication that is unreliable but fast, making it useful for streaming real-time data like video and audio. Transmission Control Protocol (TCP) provides reliable and ordered data transmission that is slower but ensures data integrity and completeness, making it useful for applications that require high reliability like web browsing or email."
            },
            {
                "a2": "Incorrect. This answer describes the opposite of the correct answer, confusing the services provided by UDP and TCP."
            },
            {
                "a3": "Incorrect. UDP and TCP provide different services and are not interchangeable within communications architecture."
            },
            {
                "a4": "Incorrect. UDP and TCP are used in both wireless and wired networks and have no relevance to the type of network used."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Open design",
        "level": "beginner",
        "question": "What is open design in architecture?",
        "answers": [
            {
                "a": "A process of creating and sharing design ideas, plans, and techniques in a community-based approach."
            },
            {
                "b": "A process of creating design ideas by a single architect."
            },
            {
                "c": "A process of keeping design ideas confidential and not sharing them with a wider community."
            },
            {
                "d": "A process of creating design ideas without any feedback or inputs from stakeholders."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Open design in architecture refers to the collaborative process of creating and sharing design ideas, plans, and techniques. It involves a community-based approach to design that encourages the participation of various stakeholders, including architects, engineers, builders, and end-users."
            },
            {
                "b": "Incorrect. Open design is a collaborative process and not the work of a single person."
            },
            {
                "c": "Incorrect. Open design prioritizes transparency and inclusivity, which means design ideas are expected to be shared widely."
            },
            {
                "d": "Incorrect. Open design encourages the participation of various stakeholders, including architects, engineers, builders, and end-users."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Data Protection and Privacy Architecture",
        "level": "advanced",
        "question": "What are some requirements of the General Data Protection Regulation (GDPR)?",
        "answers": [
            {
                "a": "Providing individuals with easy access to their data and the right to object to automated data profiling"
            },
            {
                "b": "Implementing technical and organizational measures to ensure data protection and privacy by default"
            },
            {
                "c": "Obtaining explicit consent for data processing activities, notifying data breaches to regulatory authorities, and appointing a data protection officer"
            },
            {
                "d": "All of the above"
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Correct. GDPR requires individuals to easily access their data and object to automated data profiling activities."
            },
            {
                "b": "Correct. GDPR mandates that data protection and privacy are incorporated by design and by default."
            },
            {
                "c": "Correct. GDPR requires obtaining explicit consent for data processing activities, while also requiring the notification of data breaches to regulatory authorities and appointing a data protection officer for qualifying organizations."
            },
            {
                "d": "Correct. GDPR requires all of the above activities to be performed to ensure the protection and privacy of personal data wherever and however it is processed."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Security culture and shift-left",
        "level": "intermediate",
        "question": "What is shift-left?",
        "answers": [
            {
                "a": "The idea of integrating security throughout the software development process, instead of waiting until the end"
            },
            {
                "b": "The idea of developing software without any security concerns"
            },
            {
                "c": "The idea of testing software for security after it has been released"
            },
            {
                "d": "The idea of waiting until the end of the software development process to test for security"
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Shift-left is the idea of integrating security throughout the software development process, instead of waiting until the end."
            },
            {
                "b": "Incorrect. Developing software without any security concerns will not result in a secure product."
            },
            {
                "c": "Incorrect. Testing software for security after it has been released is not as effective as integrating security throughout the development process."
            },
            {
                "d": "Incorrect. Waiting until the end of the software development process to test for security is not as effective as integrating security throughout the development process."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Psychological acceptability",
        "level": "beginner",
        "question": "What is psychological acceptability?",
        "answers": [
            {
                "a1": "A building that has a lot of space"
            },
            {
                "a2": "A building that positively influences the emotions and wellbeing of its users"
            },
            {
                "a3": "A building that has plenty of windows"
            },
            {
                "a4": "A building that is located downtown"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Having a lot of space is not necessarily related to psychological acceptability."
            },
            {
                "a2": "Correct. Psychological acceptability refers to how a space or building can positively influence the emotions and wellbeing of its users."
            },
            {
                "a3": "Incorrect. Having plenty of windows is a factor to consider, but it's not the only one for achieving psychological acceptability."
            },
            {
                "a4": "Incorrect. The location of a building is not directly related to psychological acceptability."
            }
        ]
    },
    {
        "topic": "General",
        "category": "Safe Internet Usage",
        "level": "advanced",
        "question": "What is a virtual private network (VPN) used for?",
        "answers": [
            {
                "a1": "Hacking other people's computers"
            },
            {
                "a2": "Keeping your internet browsing private"
            },
            {
                "a3": "Increasing computer processing speed"
            },
            {
                "a4": "Sharing files with other people"
            }
        ],
        "correct_answer": "a2",
        "explanations": [
            {
                "a1": "Incorrect. Hacking other people's computers with a VPN is illegal and unethical."
            },
            {
                "a2": "Correct. A VPN encrypts your internet traffic, preventing third parties from intercepting or monitoring your online activities."
            },
            {
                "a3": "Incorrect. A VPN does not increase a computer's processing speed."
            },
            {
                "a4": "Incorrect. Sharing files with other people does not require a VPN."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Cryptographic Architecture",
        "level": "expert",
        "question": "What are the different levels at which Cryptographic Architecture can be implemented?",
        "answers": [
            {
                "a": "Application, network, and hardware."
            },
            {
                "b": "Operating system, database, and middleware."
            },
            {
                "c": "Front-end, back-end, and full-stack."
            },
            {
                "d": "Cloud, on-premise, and hybrid."
            }
        ],
        "correct_answer": "a",
        "explanations": [
            {
                "a": "Correct. Cryptographic Architecture can be implemented at various levels, such as application, network, and hardware."
            },
            {
                "b": "Incorrect. These are not the levels at which Cryptographic Architecture can be implemented."
            },
            {
                "c": "Incorrect. These are not the levels at which Cryptographic Architecture can be implemented."
            },
            {
                "d": "Incorrect. These are not the levels at which Cryptographic Architecture can be implemented."
            }
        ]
    },
    {
        "topic": "Architecture and Concepts",
        "category": "Open design",
        "level": "intermediate",
        "question": "What are the benefits of open design in architecture?",
        "answers": [
            {
                "a": "Encourages community-based approach to design."
            },
            {
                "b": "Prioritizes transparency, accessibility, and inclusivity."
            },
            {
                "c": "Fosters innovation, creativity, and sustainability."
            },
            {
                "d": "All of the above."
            }
        ],
        "correct_answer": "d",
        "explanations": [
            {
                "a": "Correct. Open design encourages the participation of various stakeholders, leading to a community-based approach to design."
            },
            {
                "b": "Correct. Open design prioritizes transparency, accessibility, and inclusivity, allowing individuals from diverse backgrounds and skill sets to contribute to a project."
            },
            {
                "c": "Correct. Open design fosters innovation, creativity, and sustainability, resulting in more impactful and cost-effective architectural designs."
            },
            {
                "d": "Correct. All of the options are benefits of open design in architecture."
            }
        ]
    }
]
  return questions;
}

async function startGame() {
  startButton.classList.add('hide');
  explanationElement.classList.add('hide');
  const questions = await loadQuestions();
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');

  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }

  // Clear explanation
  explanationElement.classList.add('hide');
  explanationElement.innerText = '';
}

function showQuestion(question) {
  informationElement.innerText = question.topic + " - " + question.category + " - " + question.level + " - [" + (currentQuestionIndex + 1) + "]/[" + shuffledQuestions.length + "]";
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.innerText = Object.values(answer)[0];
    button.classList.add('btn');
    button.dataset.answer = Object.keys(answer)[0]; // assign answer id to button

    //check which value is correct
    if (Object.keys(answer)[0] == question.correct_answer) {
      button.dataset.correct = true;
    }
    
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  // Display explanation
  const explanations = shuffledQuestions[currentQuestionIndex].explanations;
  const getKeyDescription = (key) => {
    const answer = explanations.find(answer => answer[key]);
    return answer ? answer[key] : undefined;
  }
  //const explanationText = explanations[0][selectedButton.dataset.answer];
  const explanationText = getKeyDescription(selectedButton.dataset.answer);
  explanationElement.innerText = explanationText;
  explanationElement.classList.remove('hide');

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}