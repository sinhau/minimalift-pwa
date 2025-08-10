import { SeedData } from "../types";

export const seedData: SeedData = 
{
  "programId": "minimalift_3day",
  "title": "Minimalift 3-Day Full Body",
  "days": [
    {
      "dayId": "p1_w1_d1",
      "programId": "minimalift_3day",
      "title": "Phase 1 • Week 1 • Day 1",
      "order": 1,
      "blocks": [
        {
          "type": "warmup",
          "timerType": "none",
          "exercises": [
            {
              "id": "pogos",
              "name": "Pogos",
              "sets": 3,
              "reps": "20",
              "restSec": 10,
              "cues": "Stay light on your feet and keep soft knees",
              "substitutes": ["Calf Raise"]
            },
            {
              "id": "knee_tuck",
              "name": "Knee Tuck",
              "sets": 3,
              "reps": "10-15",
              "restSec": 10,
              "cues": "Sit on an elevated surface for more range of motion if desired"
            }
          ]
        },
        {
          "type": "strength",
          "timerType": "interval",
          "timerConfig": {
            "intervalSec": 120,
            "rounds": 6,
            "exercisesPerInterval": 2
          },
          "notes": "Set a timer for 12 minutes. Every 2 minutes on the minute, perform 1 set of 5 reps on both exercises. Rest in the remainder of the 2 minutes.",
          "exercises": [
            {
              "id": "barbell_squat",
              "name": "Barbell Squat",
              "sets": 6,
              "reps": "5",
              "cues": "Start light and add weight each set, aiming to hit your heaviest weight around Set 4-5",
              "substitutes": ["Goblet Squat", "Leg Press"]
            },
            {
              "id": "z_press",
              "name": "Z-Press",
              "sets": 6,
              "reps": "5",
              "substitutes": ["Seated Press", "DB Incline Press"]
            }
          ]
        },
        {
          "type": "swole",
          "timerType": "none",
          "exercises": [
            {
              "id": "dumbbell_press",
              "name": "Dumbbell Press",
              "sets": 1,
              "reps": "6-10",
              "restSec": 0,
              "cues": "For additional gains, you can increase by 1 to 2 sets per exercise",
              "substitutes": ["Bench Press", "Push Up"]
            },
            {
              "id": "scapula_push_up",
              "name": "Scapula Push Up",
              "sets": 1,
              "reps": "10",
              "restSec": 0,
              "cues": "Use this as active rest before going to the next exercise",
              "substitutes": ["Cat Cow", "Plank"]
            },
            {
              "id": "dumbbell_rdl",
              "name": "Dumbbell RDL",
              "sets": 1,
              "reps": "6-10",
              "restSec": 60,
              "cues": "Pause on final rep for 10 seconds in the stretch position",
              "substitutes": ["Barbell RDL", "Single Leg RDL"]
            }
          ]
        },
        {
          "type": "accessory",
          "timerType": "none",
          "exercises": [
            {
              "id": "y_raise",
              "name": "Y Raise",
              "sets": 1,
              "reps": "10-15",
              "restSec": 0,
              "cues": "Feel free to add extra sets if time permits",
              "substitutes": ["DB Lateral Raise", "Band Lateral Raise"]
            },
            {
              "id": "squat_curl",
              "name": "Squat Curl",
              "sets": 1,
              "reps": "10-15",
              "restSec": 0,
              "substitutes": ["Incline Curl", "Preacher Curl"]
            },
            {
              "id": "katana_extension",
              "name": "Katana Extension",
              "sets": 1,
              "reps": "10-15",
              "restSec": 0,
              "substitutes": ["DB Overhead Ext", "DB Side Lying Ext"]
            }
          ]
        }
      ]
    },
    {
      "dayId": "p1_w1_d2",
      "programId": "minimalift_3day",
      "title": "Phase 1 • Week 1 • Day 2",
      "order": 2,
      "blocks": [
        {
          "type": "warmup",
          "timerType": "none",
          "exercises": [
            {
              "id": "hollowbody_hold",
              "name": "Hollowbody Hold",
              "sets": 3,
              "reps": "15s",
              "restSec": 10,
              "cues": "Pick a level of difficulty that is just manageable by the end",
              "substitutes": ["Plank"]
            },
            {
              "id": "scapula_pull_up",
              "name": "Scapula Pull Up",
              "sets": 3,
              "reps": "10",
              "restSec": 10,
              "cues": "Place your feet on the ground to offload your bodyweight as needed"
            }
          ]
        },
        {
          "type": "strength",
          "timerType": "interval",
          "timerConfig": {
            "intervalSec": 120,
            "rounds": 6,
            "exercisesPerInterval": 2
          },
          "notes": "Set a timer for 12 minutes. Every 2 minutes on the minute, perform 1 set of 5 reps on both exercises. Rest in the remainder of the 2 minutes.",
          "exercises": [
            {
              "id": "deadlift",
              "name": "Deadlift",
              "sets": 6,
              "reps": "5",
              "cues": "Start light and add weight each set, aiming to hit your heaviest weight around Set 4-5",
              "substitutes": ["DB Deadlift", "Trap Bar Deadlift"]
            },
            {
              "id": "chin_up",
              "name": "Chin Up",
              "sets": 6,
              "reps": "5",
              "substitutes": ["Lat Pulldown", "Inverted Row"]
            }
          ]
        },
        {
          "type": "swole",
          "timerType": "none",
          "exercises": [
            {
              "id": "deficit_reverse_lunge",
              "name": "Deficit Reverse Lunge",
              "sets": 1,
              "reps": "8-12 e/s",
              "restSec": 0,
              "cues": "Perform all reps on one side before switching to the other leg",
              "substitutes": ["Single Leg Press", "Split Squat"]
            },
            {
              "id": "copenhagen_plank",
              "name": "Copenhagen Plank",
              "sets": 1,
              "reps": "20s e/s",
              "restSec": 0,
              "cues": "Select your choice of difficulty"
            }
          ]
        },
        {
          "type": "accessory",
          "timerType": "none",
          "exercises": [
            {
              "id": "pullover_skullcrusher",
              "name": "Pullover + Skullcrusher",
              "sets": 1,
              "reps": "10-15",
              "restSec": 0,
              "cues": "Feel free to add extra sets if time permits",
              "substitutes": ["Triceps Extension"]
            },
            {
              "id": "dumbbell_row",
              "name": "Dumbbell Row",
              "sets": 1,
              "reps": "10-15",
              "restSec": 0,
              "substitutes": ["Single DB Row", "Cable Row"]
            },
            {
              "id": "halos",
              "name": "Halos (KB or DB)",
              "sets": 1,
              "reps": "10-15",
              "restSec": 0
            }
          ]
        }
      ]
    },
    {
      "dayId": "p1_w1_d3",
      "programId": "minimalift_3day",
      "title": "Phase 1 • Week 1 • Day 3",
      "order": 3,
      "blocks": [
        {
          "type": "warmup",
          "timerType": "none",
          "exercises": [
            {
              "id": "turkish_get_up",
              "name": "Turkish Get Up",
              "sets": 3,
              "reps": "5 e/s",
              "restSec": 10,
              "cues": "Dumbbell, Kettlebell or Bodyweight"
            }
          ]
        },
        {
          "type": "strength",
          "timerType": "interval",
          "timerConfig": {
            "intervalSec": 120,
            "rounds": 6,
            "exercisesPerInterval": 2
          },
          "notes": "Set a timer for 12 minutes. Every 2 minutes on the minute, perform 1 set of 5 reps on both exercises. Rest in the remainder of the 2 minutes.",
          "exercises": [
            {
              "id": "wide_deadlift",
              "name": "Wide Deadlift",
              "sets": 6,
              "reps": "5",
              "cues": "Start light and add weight each set, aiming to hit your heaviest weight around Set 4-5",
              "substitutes": ["DB Deadlift", "Trap Bar Deadlift"]
            },
            {
              "id": "dumbbell_row_d3",
              "name": "Dumbbell Row",
              "sets": 6,
              "reps": "5",
              "substitutes": ["Cable Row", "Inverted Row"]
            }
          ]
        },
        {
          "type": "swole",
          "timerType": "none",
          "exercises": [
            {
              "id": "close_grip_bench_press",
              "name": "Close Grip Bench Press",
              "sets": 1,
              "reps": "8-12",
              "restSec": 0,
              "substitutes": ["Close Grip Push Up", "Dip"]
            },
            {
              "id": "seated_good_morning",
              "name": "Seated Good Morning",
              "sets": 1,
              "reps": "8-10",
              "restSec": 0,
              "cues": "2 second pause in the bottom of each rep. Only go as low as mobility allows"
            }
          ]
        },
        {
          "type": "accessory",
          "timerType": "circuit",
          "timerConfig": {
            "stations": [
              { "name": "Backwards Walk", "durationSec": 60 },
              { "name": "Suitcase March", "durationSec": 60 }
            ],
            "rounds": 5,
            "transitionSec": 30
          },
          "notes": "Perform both exercises as a timed circuit. No rest between exercises. 30s rest between rounds",
          "exercises": [
            {
              "id": "backwards_treadmill_walk",
              "name": "Backwards Treadmill Walk",
              "sets": 5,
              "reps": "60s",
              "restSec": 0,
              "substitutes": ["Backwards Sled Drag", "Poliquin Step Up"]
            },
            {
              "id": "suitcase_march",
              "name": "Suitcase March",
              "sets": 5,
              "reps": "30s e/s",
              "restSec": 0,
              "cues": "Perform stationary if space is limited. Switch the starting arm on each round"
            }
          ]
        }
      ]
    }
  ]
};
