instance_type          = "m7i-flex.large"
jenkins_ec2_instance   = "jenkins-server"
jenkins_security_group = "jenkins-sg"
public_subnets         = ["10.0.1.0/24"]
vpc_cidr               = "10.0.0.0/16"
vpc_name               = "jenkins-vpc"