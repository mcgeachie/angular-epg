import geb.spock.GebSpec
import spock.lang.Unroll

class FindAndWatchHomepageSpec extends GebSpec {

    @Unroll
    void 'When going to #url tab #tab is highlighted, and the text contains #content'() {
        when:
        go url

        then:
        waitFor {
            $('nav a.active').text() == tab
            $('.tab h1').text() == content
            $('.tab p').text() == message
        }

        where:
        url                     | tab                | content                 | message
        '/'                     | 'Today'            | 'TODAY'                 | 'Today'
        '/#/today'              | 'Today'            | 'TODAY'                 | 'Today'
        '/#/tv-guide'           | 'TV Guide'         | 'TV GUIDE'              | 'TV Guide'
        '/#/find-tv-and-movies' | 'Find TV & Movies' | 'FIND AND WATCH MOVIES' | 'Find TV and Movies'
        '/#/sky-channels'       | 'Sky Channels'     | 'SKY CHANNELS'          | 'Sky Channels'
        '/#/ways-to-watch'      | 'Ways To Watch'    | 'WAYS TO WATCH'         | 'Ways to Watch'
    }
}
