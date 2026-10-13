<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Use TanStack file routes with reusable page components under `src/components/reading`; this keeps the educational frontend easy to extend without replacing navigation.
- Keep demonstration content and session-only mutations in a shared React provider, never browser persistence or simulated authentication; production services can replace this boundary later.
- Keep administrator demonstration views explicitly separate from real authentication and authorization; no frontend shortcut or credentials grant protected access.
