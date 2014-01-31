<script type="text/html" id="templateMobilePostBlog">
    <article class="row med-block mobile-block ">
        <div class="label-container">
            <span class="label">Mobile View</span>
        </div>
        <div class="span6 block-wrap fluid-offset-none">
            <div class="block-image">
                <img src="<%= thumbnail.large.url %>" width="<%= thumbnail.large.width %>" height="<%= thumbnail.large.height %>">
            </div>
            <div class="block-title">
                <h3>
                    <a href="<%= permalink %>">
                        <%= title %>
                    </a>
                </h3>
            </div>
            <div class="block-content">
                <div class="block-excerpt">
                    <p><%= content.excerpt %></p>
                </div>
                <div class="credit">
                    By <a href="<%= author.profile %>"><%= author.user %></a> | <%= publish.date %>
                </div>
            </div>
        </div>
    </article>
    <hr>
</script>