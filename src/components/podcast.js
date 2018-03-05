class Podcast {
  constructor( {id, name, description, category, artist, feed_url, img_url} ) {
    this.id = id
    this.name = name
    this.description = description
    this.category = category
    this.artist = artist
    this.feed_url = feed_url
    this.img_url = img_url
  }

  render() {
    return `<li class="list-group-item" data-id="${this.id}">${this.name}</li>`
  }

  renderDetails() {
    return `<h2>${this.name}</h2>
    <img src="${this.img_url}">
    <p>Category: ${this.category}</p>
    <p>${this.description}</p>
    <p>Artist: ${this.artist}</p>
    <a href="${this.feed_url}" target="_blank">See Episodes</a>`
  }
}
