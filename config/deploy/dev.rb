set :branch, :dev
set :deploy_to, '/data/docker-data/dev.responsibleminingindex.org/front'

server '83.166.150.184', port: '54698', user: 'antistatique', roles: %w{app db web}

SSHKit.config.command_map[:docker_compose] = "sudo docker-compose -f #{current_path.join('docker-compose.yml')} -f #{current_path.join('docker-compose.prod.yml')} -p #{fetch(:docker_app_name)}"
SSHKit.config.command_map[:docker] = 'sudo docker'
