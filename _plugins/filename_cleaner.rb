module Jekyll
  module StringFilters
    # Removes all numeric characters and everything after the last dot
    # Capitalizes only the first word
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

Liquid::Template.register_filter(Jekyll::StringFilters)
