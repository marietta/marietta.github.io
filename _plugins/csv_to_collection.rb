require 'csv'
require 'set'

module Jekyll
  class CSVToCollectionGenerator < Generator
    safe true
    priority :high

    def generate(site)
      data = CSV.parse(File.read(site.in_source_dir('_data/padapt.csv')), headers: true)

      # Create member pages
      data.each_with_index do |row, index|
        # Skip the header row
        next if index == 0
        site.collections['padapt'].docs << PadaptDataPage.new(site, site.source, row.to_hash)
      end

      # call the creators here
      create_tag_pages(site, data)
      create_taxonomy_pages(site, data)
    end

    def create_tag_pages(site, data)
      tags = Set.new
      data.each_with_index do |row, index|
        # Skip the header row
        next if index == 0
        # tag pages will be generated for these rows
        tags.merge(row['Terjedési stratégia'].split(', ')) if row['Terjedési stratégia']
        tags.merge(row['Szociális magatartási típus'].split(', ')) if row['Szociális magatartási típus']
        tags.merge(row['Flóraelem besorolás'].split(', ')) if row['Flóraelem besorolás']
        tags.merge(row['Életforma'].split(', ')) if row['Életforma']
        tags.merge(row['Maximum magasság'].split(', ')) if row['Maximum magasság']
        tags.merge(row['invasion_status_hu'].split(', ')) if row['invasion_status_hu']
        tags.merge(row['nativeness_hu'].split(', ')) if row['nativeness_hu']
      end

      # Create a page for each unique tag
      tags.each do |tag|
        tag_page = TagPage.new(site, site.source, tag)
        site.collections['tags'].docs << tag_page
        site.pages << tag_page
      end
    end

    def create_taxonomy_pages(site, data)
      tags = Set.new
      data.each_with_index do |row, index|
        # Skip the header row
        next if index == 0
        # tag pages will be generated for these rows
        tags.merge(row['class_lat'].split(', ')) if row['class_lat']
        tags.merge(row['order_lat'].split(', ')) if row['order_lat']
        tags.merge(row['family_lat'].split(', ')) if row['family_lat']
        tags.merge(row['genus_lat'].split(', ')) if row['genus_lat']
      end

      # Create a page for each unique tag
      tags.each do |tag|
        tag_page = TaxonomyPage.new(site, site.source, tag)
        site.collections['taxonomy'].docs << tag_page
        site.pages << tag_page
      end
    end

  end

  class PadaptDataPage < Page
    def initialize(site, base, data)
      @site = site
      @base = base
      @dir = 'padapt'
      @name = "#{data['taxon_lat'].strip}.html"
      super(site, base, @dir, @name)

      data.each do |key, value|
        self.data[key] = value
      end

      self.data['layout'] = 'padapt'
      self.data['title'] = data['taxon_lat']

      # These will be included into tags
      self.data['tags'] = (data['Terjedési stratégia'] || '').split(', ') +
        (data['Szociális magatartási típus'] || '').split(', ')+
        (data['Maximum magasság'] || '').split(', ')

      self.content = ""
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir = 'tags'
      @name = "#{tag.strip}.html"
      super(site, base, @dir, @name)

      dict_path = File.join(@site.source, '_data', 'dictionary.yml')
      @titles = YAML.load_file(dict_path) || {}

      self.data['layout'] = 'tags'
      self.data['title'] = fetch_title(tag.strip)
      self.data['tags'] = tag

      self.content = ""
    end

    def fetch_title(tag)
      # Check if the tag exists and has a title
      if @titles.key?(tag)
        title_entry = @titles[tag].find { |entry| entry.key?('title') }
        return title_entry['title'] if title_entry && title_entry['title']
      end

      # If no title found, check if the tag is numeric
      if numeric_tag?(tag)
        number = tag.to_i
        # Perform floating-point division
        result = number / 100.0

        # Check if the result is >= 10
        if result >= 10
          # Return as integer if there's no fractional part
          return "#{result.to_i} m maximum magasság" if result == result.to_i
          return "#{result} m maximum magasság"  # Return as float if there's a fractional part
        else
          # Return as integer if there's no fractional part for results < 10
          return "#{result.to_i} m maximum magasság" if result == result.to_i
          # Return float as string for results < 10
          return "#{result} m maximum magasság"
        end
      end
      # Return the tag itself if no title found or not numeric
      tag
    end

    def numeric_tag?(tag)
      # Check if the tag is a numeric value
      !!(tag =~ /\A\d+\z/)
    end

  end

  class TaxonomyPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir = 'taxonomy'
      @name = "#{tag.strip}.html"
      super(site, base, @dir, @name)

      self.data['layout'] = 'taxonomy'
      self.data['title'] = tag
      self.data['taxonomy'] = tag

      self.content = ""
    end
  end

end