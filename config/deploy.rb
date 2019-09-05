# config valid only for current version of Capistrano
lock '3.5.0'

set :application, 'rmi_2020_app'
set :repo_url, 'git@github.com:antistatique/rmi-app.git'

set :docker_app_name, -> {
  [fetch(:application), fetch(:stage)].join('_')
}
set :docker_app_service, 'app'

# Link file docker-compose.override.yml
set :linked_files, fetch(:linked_files, []).push('docker-compose.prod.yml')

# Link dirs files and private-files
set :linked_dirs, []

# Default value for :scm is :git
set :scm, :git

# Default value for :pty is false
# set :pty, true

# Default value for :format is :pretty
# set :format, :pretty

# Default value for keep_releases is 5
set :keep_releases, 3

# Set SSH options
set :ssh_options, {
 forward_agent: true
}

# Configure Slakkistrano
set :slackistrano, {
 klass: Slackistrano::CustomMessaging,
 channel: fetch(:slackistrano_channel, '#dev-notifications'),
 webhook: 'https://hooks.slack.com/services/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'
}

namespace :deploy do
  desc '(re)Start docker containers'
  task :restart do
    on roles(:app) do
      within current_path do
        # Build then start service
        result = capture(:docker_compose, 'top', fetch(:docker_app_service), raise_on_non_zero_exit: false)
        if result.empty?
          execute :docker_compose, 'up', '-d', '--build'
        else
          execute :docker_compose, 'up', '-d', '--no-deps', '--build', fetch(:docker_app_service)
        end
      end
    end
  end

  desc 'Stop all docker containers'
  task :stop do
    on roles(:app) do
      within current_path do
        execute :docker_compose, 'down'
      end
    end
  end

  desc 'Cleanup docker storage (container, imaged, ...)'
  task :cleanup do
    on roles(:app) do
      within current_path do
        execute :docker, 'system', 'prune', '-a', '-f', raise_on_non_zero_exit: false
      end
    end
  end

  after :publishing, 'deploy:restart'
end
