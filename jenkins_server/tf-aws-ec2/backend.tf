terraform {
  backend "s3" {
    bucket = "terraform-eks-cicd-7001-xyz123"
    key    = "jenkins/terraform.tfstate"
    region = "ap-south-1"
  }
}