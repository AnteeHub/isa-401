# Optional GitHub / Gitee guide for your agent

File handoff needs no Git installation. Use the following route only if your group can access the chosen platform. Both platforms use a shared repository, separate branches and pull-request review. A repository is the shared project with change history. A branch keeps one member's changes separate until review. These instructions are for practice, not a replacement for assessed coursework submission rules.

## Stage 1. Prepare one shared starter

One student creates an empty practice repository on **GitHub** (https://github.com) or **Gitee** (https://gitee.com). Prefer private access. Invite the two teammates with access to contribute. They accept the invitation. All three use the same platform and repository.

Owner prompt:
> Read README.md and AGENTS.md. Our platform is [GitHub/Gitee]. This is the unchanged Pelican Ride starter. Check whether Git is available, and guide me through creating one empty repository and inviting my teammates. I will do account sign-in myself. Then check the local and remote contents, help me make the initial commit and push the starter to this actual URL: [URL]. Show which files will be included. Preserve any existing content and never force-push. If Git or platform access is blocked, tell us to use file handoff.

On GitHub, invitations are under repository Settings / Collaborators. On Gitee, use the repository's management area for members. Interface labels and permissions can change. Use official help below if the current page differs. Do not promise a Gitee account or any platform will always be accessible.

If Git is missing, the agent checks the operating system and explains the appropriate official option at https://git-scm.com/downloads/. Do not install Node or Python. Git may require administrator rights. Stop setup and use file handoff if it blocks the exercise. Ask the student for their chosen commit name/email if Git requires configuration. Never invent them. Let the student complete platform authentication in trusted UI, not in source files or prompts.

## Stage 2. Each member takes a copy and a branch

Member prompt:
> Our repository URL is [URL], and I am member [A/B/C]. Help me clone the shared starter into a separate local folder, inspect its actual default branch and create a feature branch named member-[a/b/c]/feature. Check the working tree before changing anything. Then follow README.md Step 3 for my role. Change only my assigned feature file.

Use the remote's actual default branch, which may be main or master. Do not create a separate repository for each person. Work on the clone you opened in your agent, not another old copy.

## Stage 3. Send the contribution for review

Member prompt after testing:
> Show the changed-file list and explain my change briefly. Help me commit only my assigned feature file, push my feature branch and draft a pull request into the shared default branch. Include what changed, what I actually tested and anything incomplete. Guide me to create the pull request on our chosen website if you cannot do it here. Do not merge it yourself.

A commit saves a named change. Push uploads it. A pull request asks teammates to review and combine it. Review the changed-files view and try the feature in a browser. Ask the agent to explain code if needed. One teammate reviews each contribution.

## Stage 4. Combine and play

Integrator prompt:
> We have reviewed the three contributions. Read docs/INTEGRATE.md. Help us merge them one at a time, preserve our existing work, pull the combined default branch locally and open index.html. Guide the group through README.md Step 6. If a conflict appears, explain it before changing either member's code.

Everyone updates their local default branch before starting another contribution. Account sign-in, invitations and repository permissions still need the students' involvement. Never share credentials through the project.

## Official references
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)
- [GitHub collaborator invitations](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository)
- [Gitee help centre](https://help.gitee.com/)
- [Gitee official pull-request workflow explanation](https://blog.gitee.com/2020/12/15/pull-request-change-request/)

The workflow references were consulted on 6 October 2026. The Gitee article describes the concept and is not a current screenshot tutorial. If remote setup fails, keep your feature file and use README Step 5's file handoff.
