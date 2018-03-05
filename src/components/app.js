class App {
  constructor() {
    this.listDiv = document.getElementById('list-panel')
    this.details = document.getElementById('list-details')

    this.podcasts = []
    this.fetchPodcasts()
  }

  fetchPodcasts() {
    fetch("http://localhost:3000/api/v1/podcasts")
      .then(res => res.json())
      .then(json => this.displayPodcasts(json))
  }

  displayPodcasts(json) {
    // build podcast objects from JSON
    this.podcasts = json.map(podcast => new Podcast(podcast))
    // clear out listDiv
    this.listDiv.innerHTML = ""
    // build podcast list and attach it to the listDiv
    const ul = document.createElement('ul')
    ul.id = 'list'
    ul.innerHTML = this.podcasts.map(pod => pod.render()).join('')
    this.listDiv.appendChild(ul)
    // build create new podcast link and add it to listDiv and addEventListener
    const a = document.createElement('a')
    a.href = '#'
    a.id = "new-podcast"
    a.innerText = "Create New Podcast"
    this.listDiv.appendChild(a)

    const newPodcastLink = document.getElementById('new-podcast')
    newPodcastLink.addEventListener("click", event => this.renderNewPodcastForm(event))
    const listUl = document.getElementById('list')
    listUl.addEventListener("click", event => this.displayDetails(event))
  }

  displayDetails(event){
    event.preventDefault()
    //find right podcast object
    const podcast = this.podcasts.filter(pod => pod.id == event.target.dataset.id)[0]
    this.details.innerHTML = '<ul id="list">' + podcast.renderDetails() + '</ul>'
  }

  renderNewPodcastForm(event) {
    event.preventDefault()
    this.details.innerHTML = ""
    this.listDiv.innerHTML = `<form  id="form">
      Name:<br>
      <input type="text" id="podName"><br>
      Image URL:<br>
      <input type="text" id="img-url"><br>
      Category:<br>
      <input type="text" id="category"><br>
      Description:<br>
      <input type="text" id="description"><br>
      Artist:<br>
      <input type="text" id="artist"><br>
      Feed URL:<br>
      <input type="text" id="feed-url"><br><br>
      <input type="submit" value="Create New Podcast">
      </form>`
    document.getElementById('form').addEventListener("submit", event => this.createPodcast(event))
  }

  createPodcast(event) {
    event.preventDefault()
    let podcastObj = {}
    podcastObj.name = document.getElementById('podName').value
    podcastObj.img_url = document.getElementById('img-url').value
    podcastObj.description = document.getElementById('description').value
    podcastObj.category = document.getElementById('category').value
    podcastObj.artist = document.getElementById('artist').value
    podcastObj.feed_url = document.getElementById('feed-url').value
    this.persistPodcast(podcastObj)
  }

  persistPodcast(newPodcast) {
    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ podcast: newPodcast })
    }
    fetch("http://localhost:3000/api/v1/podcasts", options)
      .then(res => res.json())
      .then(json => this.fetchPodcasts())
  }
}
