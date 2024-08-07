require 'net/http'
require 'json'
require 'uri'
require 'nokogiri'

module Jekyll
  class WikipediaTag < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
      @page_title = markup.strip
    end

    def render(context)
      # Use the page title from the context if not provided
      title = @page_title.empty? ? context.registers[:page]['title'] : @page_title
      if title.nil? || title.empty?
        page_name = context.registers[:page]['name']
        title = generate_title_from_filename(page_name)
        context.registers[:page]['title'] = title
      end

      encoded_title = URI.encode_www_form_component(title.downcase)
      puts(encoded_title)

      # Fetch the Wikipedia page content
      uri = URI("https://en.wikipedia.org/w/api.php?action=parse&page=#{encoded_title}&format=json&prop=text&section=0")
      response = Net::HTTP.get(uri)
      json = JSON.parse(response)

      if json['parse'] && json['parse']['text']
        html_content = json['parse']['text']['*']

        # Parse the HTML fragment and remove the infobox
        document = Nokogiri::HTML.fragment(html_content)
        document.css('.infobox.biota').remove  # Remove the infobox element

        # Return the modified HTML content
        return document.to_html
      else
        # Log the URI to the console if content not found
        puts "Content not found for URI: #{uri}"
        return "Content not found for URI: #{uri}"
      end
    end

    def generate_title_from_filename(filename)
      # Remove the file extension and replace dashes/underscores with spaces
      File.basename(filename, File.extname(filename)).gsub(/\d/, '').gsub(/[-_]/, ' ').strip
    end
  end
end


Liquid::Template.register_tag('wikipedia', Jekyll::WikipediaTag)
