# SwimAPI — stable lane positions

Load `data/race-data.js` and `src/api.js` as ordinary scripts, then:

```html
<script src="data/race-data.js"></script>
<script src="src/api.js"></script>
<script>
const race = SwimAPI.create(SWIM_DATA);
const frame = race.sample(2.5); // exercise seconds, NOT original video time
console.log(frame.athletes[0]);
const swimmer = race.athlete(4, 2.5);
const point = race.toPixels(swimmer.videoPoint, 1280, 720);
const lane = race.lane(4);
</script>
```

## Position and geometry

- `lanePosition: {laneId, distanceM}` is the athlete's one-dimensional estimated progress along a lane. It is the primary lane + distance representation. `progress` is distanceM / 50 for a schematic pool.
- `videoPoint: {x,y}` uses normalized video coordinates (0–1). x is smoothed observed screen position. y stays on the lane's fixed centerline, so it does not bounce with strokes. This is an approximate visual anchor, not a newly detected body center.
- `centerline` contains normalized screen endpoints; `region` is a four-point polygon. Adjacent lane regions meet without gaps so hit-testing is continuous. They are derived static guides, not measured pool segmentation. They do not remove spectator flags or lighting reflections from the video.
- Camera calibration is absent. Do not turn `distanceM` into video x using `distanceM / 50`; use `videoPoint`. Camera motion/perspective prevent treating the screen guides as accurate world coordinates.
- `estimatedRank` is recomputed from smoothed estimated distance (descending), with lane ID as deterministic tie-breaker. `sourceRank` preserves the nearest source sample's rank. Neither is an authenticated official result.

## API

| Call | Returns |
| --- | --- |
| `race.sample(t)` | All eight athletes, exercise time, corresponding video time |
| `race.athlete(id,t)` | One athlete including stable videoPoint, distance and rank |
| `race.lane(id)` | Metadata, centerline and polygon for that lane |
| `race.hitLane(x,y)` | Lane ID at normalized video coordinates, or null outside |
| `race.toPixels(point,w,h)` | Position in the displayed video rectangle |
| `race.toVideoTime(t)` | t + 5 seconds, clamped to the provided exercise segment |
| `race.fromVideoTime(t)` | Original video time minus 5, clamped |
| `race.duration` | 15.98 exercise seconds |

Invalid lane IDs throw. Time must be finite; times outside the clip clamp to its endpoints. Snapshots contain fresh athlete objects. Draw on requestAnimationFrame and query `sample()` each frame. Shape-preserving cubic interpolation avoids stepping at data-frame boundaries. There is no vertical bobbing in `videoPoint`.

The JSON and JS representations contain identical data. The pages use local classic scripts and are designed for direct file opening, but file:// was not browser-tested in this build. The verified route is the root Python HTTP launcher; no pip or npm packages are needed. A custom app using fetch or ES modules also needs HTTP. Every folder is standalone; keep data and src together. The full SwimComposer source requires HTTP. See the root README.md for platform coverage.
