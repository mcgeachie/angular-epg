'use strict'

describe 'epg filters', ->

    beforeEach ->
        module('epgFilters')

    describe 'durationInPixels', ->

        it 'should convert one hour to 250 pixels', ->
            oneHour = 60 * 60
            inject (durationInPixelsFilter, oneHourInPixels) ->
                expect(durationInPixelsFilter(oneHour)).toBe(oneHourInPixels + 'px')

        it 'should convert 30 minutes to 125 pixels', ->
            thirtyMinutes = 30 * 60
            inject (durationInPixelsFilter, oneHourInPixels) ->
                expect(durationInPixelsFilter(thirtyMinutes)).toBe((oneHourInPixels / 2) + 'px')

    describe 'startTimeInPixels', ->

        it 'should convert midnight to zero', ->
            now = new Date()
            midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime() / 1000

            inject (startTimeInPixelsFilter, oneHourInPixels) ->
                expect(startTimeInPixelsFilter(midnight)).toBe '0px'

        it 'should convert 1am to 250px', ->
            now = new Date()
            oneAm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 1, 0, 0).getTime() / 1000

            inject (startTimeInPixelsFilter, oneHourInPixels) ->
                expect(startTimeInPixelsFilter(oneAm)).toBe(oneHourInPixels + 'px')