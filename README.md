
# *Who* Should I Follow?

Have you ever wanted to know who are the **best people** online
**to follow** and ***why***?

- Who posts interesting content and who doesn't?
- Who is "**trending**" and ***why***?

I wonder this all the time.
So I'm building ***fuata*** (working title) to [***scratch my own itch***](https://gettingreal.37signals.com/ch02_Whats_Your_Problem.php).

# Data Model

I expect to store a couple of hundred (million) records in the database.

- fullName
- @username
- dateJoined

Followers
- followingUsername
- @username
- dateFollowed
- dateUnfollowed


Example data structure:
```js
{
    "followers": [
        {
            "u": "u1",
            "s": "timestamp"
        },
        {
            "u": "u2",
            "s": "timestamp"
        }
    ],
    "following": [
        {
            "u": "u3",
            "s": "timestamp"
        },
        {
            "u": "u2",
            "s": "timestamp",
            "e": "timestamp"
        }
    ]
}

```

This can be stored as a basic
[flat-file database](http://en.wikipedia.org/wiki/Flat_file_database)
where **github-username.json** would be the file

the key here is:

- **u**: *username* (of the person who the user is following
  or being followed by)
- **s**: *startdate* when the person first started following/being followed
- **e**: *enddate* when the person stopped following


# Simple UI

> - [ ] Upload sketch


<br />
---

## FAQ?

**Q**:How is this different from Klout? <br />
**A**:[Klout](https://klout.com/corp/score) tries to calculate your
"influence". That's interesting.
