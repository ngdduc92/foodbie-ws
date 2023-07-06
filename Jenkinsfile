pipeline {
    agent any

    tools {nodejs "18.15.0"}

    stages {
        stage('Build Check') {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }

        stage('Build Image') {
            when {
                branch "dev"
            }
            steps {
                sh "docker build -t foobbie-ws:0.0.1 ."
                echo 'Build successfully'
            }
        }

        stage('Build') {
            when {
                branch "dev"
            }
            steps {
                sh "chmod +x ./stopByPort.sh"
                sh "./stopByPort.sh 5000"
                echo 'Stop successfully'
            }
        }
        stage('Deploy') {
            when {
                branch "dev"
            }
            steps {
                sh "docker run -d -p 5000:5000 --rm foobbie-ws:0.0.1"
                echo 'Start successfully'
            }
        }
    }
    post { 
        always { 
            cleanWs()
            sh 'docker image prune'
            echo 'Remove images successfully'
        }
    }
}
