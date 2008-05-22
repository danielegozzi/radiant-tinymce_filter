class TinyMceFilter < TextFilter
  filter_name "TinyMce"
  description_file File.dirname(__FILE__) + "/../tinymce.html"
  def filter(text)
    text
  end
end