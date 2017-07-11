# Southampton.Digital

An online list of the great digital events in and around Southampton

## Running locally

Once you have Ruby set up and the repository cloned:

```
gem install bundle
bundle install
bundle exec jekyll build --watch
```

Then serve up the generated `_site` folder; e.g.:

```
cd _site
python -m SimpleHTTPServer
```
http://localhost:8000

## TODO/Ideas:
- Logo / Design review
- Fill out the events info we can take
- Wrap the events in schema.org gubbins
- Pagination at some point
- Github Link
- RSS Feed
- iCal Feed
- Readme for adding an event
    + Define naming convention for the event files
- Display by month?
- Tags / Interests?
- A calendar view?
- Past view?
