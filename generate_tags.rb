require 'fileutils'

# Define the directories for posts and their corresponding tags
collection = {
  # 'tags' => 'species',
  'species' => 'taxonomy'
}

# Create a hash to hold tags for each directory
tags_hash = Hash.new { |hash, key| hash[key] = [] }

# Loop through each directory to collect unique tags
collection.each do |tags_dir_name, post_dir|
  tags_path = "_#{tags_dir_name}"
  posts_path = "_#{post_dir}"


  # Create the tags directory if it doesn't exist
  FileUtils.mkdir_p(tags_path)
  # Read all markdown files in the posts directory
  Dir.glob("#{posts_path}/*.md") do |file|
    content = File.read(file)
    puts(file)

    # Use regex to find tags in the front matter for both formats
    if content =~ /tags:\s*\[(.*?)\]/ || content =~ /tags:\s*\n\s*-\s*(.*?)(?=\n\s*-|\z)/
      # Check if the first format matches
      if $1
        # Split the tags and strip whitespace for the first format
        tags_hash[tags_dir_name].concat($1.split(',').map(&:strip))
      else
        # Split the tags and strip whitespace for the second format
        tags = $&.scan(/-\s*(.*?)(?=\n\s*-|\z)/).flatten.map(&:strip)
        tags_hash[tags_dir_name].concat(tags)
      end
    end
  end

  # Remove duplicates and sort the tags
  unique_tags = tags_hash[tags_dir_name].uniq.sort
  puts(unique_tags)

  # Create markdown files for each unique tag
  unique_tags.each do |tag|
    # Create a sanitized filename
    tag_filename = "#{tag.downcase.gsub(/[^a-z0-9\-]/, '-')}.md"
    tag_file_path = File.join(tags_path, tag_filename)

    # Skip if the tag file already exists
    unless File.exist?(tag_file_path)
      File.open(tag_file_path, 'w') do |f|
        f.write("---\n")
        f.write("#{tags_dir_name}: #{tag}\n")
        f.write("layout: #{tags_dir_name}\n")  # Use a layout specific to the directory
        f.write("---\n")
        f.write("\n")
      end
      puts "Created tag page for #{tag} in #{tags_path}: #{tag_file_path}"
    else
      puts "Tag page already exists for #{tag} in #{tags_path}: #{tag_file_path}"
    end
  end
end
