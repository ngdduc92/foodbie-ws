pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh "docker build -t foobbie-ws:0.0.1 ."
                echo 'Build successfully'

                sh "chmod +x ./stopByPort.sh"
                sh "./stopByPort.sh 5000"
                echo 'Stop successfully'
            }
        }
        stage('Deploy') {
            steps {
                sh "docker run -d -p 5000:5000 foobbie-ws:0.0.1"
                echo 'Start successfully'
            }
        }
    }
}
