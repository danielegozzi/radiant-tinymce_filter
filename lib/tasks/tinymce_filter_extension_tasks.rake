namespace :radiant do
  namespace :extensions do
    namespace :tinymce_filter do
      
      desc "Runs the migration of the TinymceFilter extension"
      task :migrate => :environment do
        require 'radiant/extension_migrator'
        if ENV["VERSION"]
          TinymceFilterExtension.migrator.migrate(ENV["VERSION"].to_i)
        else
          TinymceFilterExtension.migrator.migrate
        end
      end
      
      desc "Copies public assets of the TinymceFilter to the instance public/ directory."
      task :update => :environment do
        is_svn_or_dir = proc {|path| path =~ /\.svn/ || File.directory?(path) }
        Dir[TinymceFilterExtension.root + "/public/**/*"].reject(&is_svn_or_dir).each do |file|
          path = file.sub(TinymceFilterExtension.root, '')
          directory = File.dirname(path)
          puts "Copying #{path}..."
          mkdir_p RAILS_ROOT + directory
          cp file, RAILS_ROOT + path
        end
      end
      
      desc "Install the TinymceFilter extension"
      task :install => :update do
      end
    end
  end
end
