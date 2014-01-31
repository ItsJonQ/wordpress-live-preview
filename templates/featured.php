<script type="text/html" id="templatePostFeatured">
    <article class="row large-block ">
        <div class="label-container">
            <span class="label">Featured View</span>
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
                <img src="<%= thumbnail.large.url %>" width="<%= thumbnail.large.width %>" height="<%= thumbnail.large.height %>">
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