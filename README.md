<p align="center">
  <img width="400" src="./screenshot.png">
  <h3 align="center">netflix-box</h3>
  <p align="center">Update a pinned gist to contain a crypto price</p>
</p>

---

> 📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## Setup

### Prep work

1. Create a new public GitHub Gist (https://gist.github.com/)
1. Create an access token with the `gist` scope and copy it. (https://github.com/settings/tokens/new)
1. Login to [Netflix](https://www.netflix.com/login)

### Project setup

1. Fork this repo
1. Edit the [environment variables](https://github.com/austenstone/netflix-box/blob/main/.github/workflows/schedule.yml) in `.github/workflows/schedule.yml`:
account.

   - **GIST_ID:** The ID portion from your gist url: `https://gist.github.com/austenstone/`**`40b6a7b4e19c1526619df8f99fbd522a`**.
   - NETFLIX_MAX_ITEMS: The maximum number of items on the gist.
   - NETFLIX_MIN_DURATION: A filter for the minimum watch duration.

1. Go to the repo **Settings > Secrets**
   - **NETFLIX_EMAIL:** Your Twitter consumer API key.
   - **NETFLIX_PASSWORD:** Your Twitter consumer secret.
   - NETFLIX_GUID: The ID portion from your Netflix profiles [Viewing activity]() url: `https://www.netflix.com/settings/viewed/`**`6FOZYPY6B4FGRCUL6IT2DXS65E`**. Visit [Your Netflix Account](https://www.netflix.com/YourAccount).
