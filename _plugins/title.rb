module Jekyll
  class GiveTitle < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
      @page_title = markup.strip
    end

    def render(context)
      # Use the page title from the context if not provided
      # title = @page_title.empty? ? context.registers[:page]['title'] : @page_title
      page_name = context.registers[:page]['name']
      puts(page_name)
      title = filename_cleaner(page_name)
      context.registers[:page]['title'] = title
    end

    def filename_cleaner(input)
      # Remove all numeric characters, Replace hyphens and underscores with spaces
      cleaned = input.gsub(/\d/, '').gsub(/[-_]/, ' ')

      # Capitalize only the first word
      if cleaned.strip.length > 0
        first_word_capitalized = cleaned.split
        first_word_capitalized[0] = first_word_capitalized[0].capitalize
        cleaned = first_word_capitalized.join(' ')
      end

      # Remove everything after the last dot (including the dot itself)
      cleaned.rpartition('.').first.strip

    end
  end
end

Liquid::Template.register_tag('give_title', Jekyll::GiveTitle)
