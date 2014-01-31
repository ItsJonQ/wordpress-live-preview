<script type="text/html" id="templatePostBlog">
    <article class="row big-block ">
        <div class="label-container">
            <span class="label">Standard / Tablet View</span>
        </div>
        <header class="span8 fluid-offset-none nolinks">
            <div class="block-title">
                <h3>
                    <a href="<%= permalink %>">
                        <%= title %>
                    </a>
                </h3>
            </div>
        </header>
        <div class="span8 block-wrap fluid-offset-none">
            <div class="block-image">
                <img src="<%= thumbnail.medium.url %>" width="<%= thumbnail.medium.width %>" height="<%= thumbnail.medium.height %>">
            </div>
            <div class="block-content">
                <div class="credit">
                    By <a href="<%= author.profile %>"><%= author.user %></a> | <%= publish.date %>
                </div>
                <div class="block-excerpt">
                    <p><%= content.excerpt %></p>
                </div>
                <div class="meta">
                    <a href="#">Read More</a>
                </div>
            </div>
        </div>
    </article>
    <hr>
</script>