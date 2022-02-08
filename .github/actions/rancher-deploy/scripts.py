#!/usr/bin/python
import click
import yaml
import os

@click.group()
def cli():
    pass

@cli.command()
@click.option('--image')
@click.option('--service')
@click.option('--url')
@click.option('--access')
@click.option('--secret')
@click.option('--environment')
def up(image, service, url, access, secret, environment):
  """"""
  stack, service_name = service.split("/", 1)

  command = "rancher --url {url} --access-key {access} --secret-key {secret} --environment {environment}".format(
    url=url,
    access=access,
    secret=secret,
    environment=environment
  )

  print("Running command: {}".format(command))

  # Export stack services configuration
  os.system(
    """
    {cmd} export {stack}
    """.format(cmd=command, stack=stack)
  )
  # Update image to docker-compose 
  docker_compose_filename = '{0}/docker-compose.yml'.format(stack)
  rancher_compose_filename = '{0}/rancher-compose.yml'.format(stack)
  with open(docker_compose_filename, 'r') as file:
    compose = yaml.load(file, Loader=yaml.FullLoader)
    compose['services'][service_name]['image'] = str(image)
  
  with open(docker_compose_filename, 'w') as file:
    yaml.dump(compose, file)

  # Run rancher-cli to up new files
  os.system(
    """
    {cmd} up --stack {stack} --file {docker_compose_filename} --rancher-file {rancher_compose_filename} -d -c -u -p
    """.format(
      cmd=command,
      stack=stack,
      docker_compose_filename=docker_compose_filename,
      rancher_compose_filename=rancher_compose_filename
    )
  )

if __name__ == '__main__':
  cli()
