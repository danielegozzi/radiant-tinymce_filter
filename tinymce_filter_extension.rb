require_dependency 'application'

class TinymceFilterExtension < Radiant::Extension
  version "1.0"
  description "Provides a TinyMCE filter for the Radiant CMS."
  url "http://code.google.com/p/radiant-tinymce-extension/"
  
  def activate
    # Load the filter
    TinyMceFilter    
    
    # Add the appropriate stylesheets to the javascripts array in the page and snippet controller
    Admin::PageController.class_eval do
      before_filter :add_tinymce_javascripts, :only => [:new, :edit]
      private
      def add_tinymce_javascripts
        @javascripts << 'extensions/tiny_mce/tiny_mce' << 'extensions/tiny_mce/tiny_mce_settings'
      end
      
    end
    
    Admin::SnippetController.class_eval do
      before_filter :add_tinymce_javascripts, :only => [:edit]
      
      def add_tinymce_javascripts
        @javascripts << 'extensions/tiny_mce/tiny_mce' << 'extensions/tiny_mce/tiny_mce_settings'
      end
      
    end
    
  end
  
  def deactivate
  end
    
end
