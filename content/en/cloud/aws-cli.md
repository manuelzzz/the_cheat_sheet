---
title: AWS CLI
description: Practical reference for configuring and using the AWS command-line interface.
tags:
  - aws
  - cli
  - devops
---

## Authentication and Configuration

```bash
aws configure                   # interactively set access key, secret, region
aws configure --profile work      # configure a named profile
aws configure list                  # show the active configuration
aws sts get-caller-identity           # verify which identity is active

export AWS_PROFILE=work         # use a named profile for this shell session
export AWS_REGION=us-east-1     # override the default region
```

- Credentials and settings are stored in `~/.aws/credentials` and
  `~/.aws/config`.
- Prefer named profiles or environment variables over hardcoding
  credentials in scripts.

## Common CLI Commands

```bash
# S3
aws s3 ls                                  # list buckets
aws s3 ls s3://my-bucket                     # list objects in a bucket
aws s3 cp file.txt s3://my-bucket/            # upload a file
aws s3 sync ./dist s3://my-bucket/               # sync a local folder to S3

# EC2
aws ec2 describe-instances                  # list instances
aws ec2 start-instances --instance-ids i-123  # start an instance
aws ec2 stop-instances --instance-ids i-123     # stop an instance

# IAM
aws iam list-users                          # list IAM users
aws iam list-roles                            # list IAM roles

# Logs
aws logs tail /aws/lambda/my-function --follow  # stream log output
```

## Core Concepts and Terminology

- **Region** — a geographic area (e.g. `us-east-1`) containing isolated
  Availability Zones.
- **IAM** — Identity and Access Management: users, roles, and policies
  controlling who can do what.
- **ARN** (Amazon Resource Name) — a unique identifier for a resource,
  e.g. `arn:aws:s3:::my-bucket`.
- **Profile** — a named set of credentials/settings, switchable via
  `--profile` or `AWS_PROFILE`.

## Common Gotchas

- Most services are region-scoped — a resource created in `us-east-1`
  won't show up when querying `eu-west-1`.
- `--profile` and `AWS_PROFILE` set the identity; `--region` and
  `AWS_REGION` set the region — mixing these up is a common source of
  "resource not found" errors.
- Use `--dry-run` (where supported) to validate permissions without
  making a real change.
- Output defaults to JSON; add `--output table` or `--output text` for
  more readable CLI output.

## References

- [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/)
- [AWS CLI User Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
- [AWS CLI Configuration Basics](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
