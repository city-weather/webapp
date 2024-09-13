pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhubcredentials') 
        PATH = "/bin:/usr/bin:/usr/local/bin:$PATH"
    }
    
    stages {
        stage("Git Checkout") {
            steps {
                git credentialsId: 'bitbucket', url: 'https://nishant-bitbucket@bitbucket.org/nishant-bitbucket/webapp.git'
                echo 'Git Checkout Completed'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t thecyberbaby/webapp:$BUILD_NUMBER ."
                echo 'Build Image Completed'
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhubcredentials', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    echo 'Login Completed'
                }
            }
        }
        
        stage('Push Image to Docker Hub') {
            steps {
                sh "docker push thecyberbaby/webapp:$BUILD_NUMBER"
                echo 'Push Image Completed'
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
        }
    }
}
