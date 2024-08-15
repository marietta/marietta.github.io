require 'fileutils'

# Define the directories for posts and their corresponding tags
collection = {
  'tags' => 'species'
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

    # Capture all lines that start with a hyphen after the taxonomy key
    tags = content.scan(/#{tags_dir_name}:\s*\n((?:\s*-\s*.*)*)\s*(?:-\s*(\w+)\s*)?/).flatten
    if tags
      # Capture all lines that start with a hyphen, except the last one
      tags_list = tags[0].scan(/-\s*(.*?)(?=\n\s*-|\z)/).flatten.map(&:strip)

      # Capture the last tag if it exists
      last_tag = tags[1]
      tags_list << last_tag if last_tag

      tags_hash[tags_dir_name].concat(tags_list) unless tags_list.empty?
      puts(tags_hash[tags_dir_name])
    end
  end

  # Remove duplicates and sort the tags
  unique_tags = tags_hash[tags_dir_name].uniq.sort
  puts(unique_tags)

  # Create markdown files for each unique tag
  unique_tags.each do |tag|
    # Create a sanitized filename
    tag_filename = "#{tag.gsub(/[^a-zA-Z0-9\-]/, '-')}.md"
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
