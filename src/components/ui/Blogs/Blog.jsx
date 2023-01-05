import React from "react";
import { Link } from "react-router-dom";
import classes from "../../../styles/Blog.module.css";
import user from "../../../assets/Ellipse.png";
import popular1 from "../../../assets/Rectangle 5.png";
const Blog = () => {
  return (
    <div className={classes.Blog}>
      <div className={classes.Tag}>
        <Link to="intermediate">Intermediate</Link>
        <Link to="intermediate">Advanced</Link>
        <Link to="intermediate">Security</Link>
      </div>
      <div className={classes.BlogContent}>
        <div className={classes.Title}>
          Why XSS Attacks Are More Dangerous for Capacitor/Cordova Apps
        </div>
        <div className={classes.Poster}>
          <div className={classes.Left}>
            <img src={user} alt="poster image" className={classes.PosterImg} />
            <div className={classes.Right}>
              <div className={classes.Name}>Hedris TemmyTop</div>
              <i>February 15, 2021</i>
            </div>
          </div>
          <div className={classes.Left}>
            <span>ico</span>
            <i className={classes.Date}>5 mins read</i>
          </div>
        </div>
        <div className={classes.PostImage}>
          <img src={popular1} alt="post image" />
        </div>
        <div className={classes.Content}>
          <p className={classes.FirstParagraph}>
            I want to preface this article by saying that the vulnerability we
            will be discussing does not mean that a "hybrid" application built
            with Capacitor/Cordova is insecure. This vulnerability is also not
            limited to Capacitor/Cordova, it would apply to any native
            application that uses a web view that implements a Javascript
            interface, or "bridge", from the web view to Native APIs.
          </p>
          <p>
            Ideally, it should not be possible to execute an XSS (Cross-Site
            Scripting) attack in your application because such attacks would
            have been appropriately protected against. However, if there is an
            XSS vulnerability in your application, the impact to the user could
            potentially be much worse when that vulnerability is exploited in a
            hybrid mobile application (rather than just a standard website).
          </p>
          <p>
            In this article, we are going to demonstrate how a successfully
            executed XSS attack in a Capacitor application could allow the
            attacker to track the users location using the native Geolocation
            API. Although we will demonstrate this vulnerability with the
            Geolocation API, the same attack could be used to access any Native
            API that the application has access to.
          </p>
          <p>
            <strong style={{ color: "#fff" }}>NOTE:</strong> It is worth
            mentioning that this article is using version 2.x of Capacitor. This
            means that all of the core plugins would be available to attack by
            default because Capacitor 2.x includes all of the core plugins by
            default (e.g. just by installing Capacitor an attacker would have
            access to these). Capacitor 3.x will require core plugins to be
            installed individually, which will help limit the impact of an
            attack like this - the attacker would only be able to attack plugins
            that have actually been installed. I have not tested Capacitor 3.x
            myself yet to confirm that this is the case, but I would assume this
            additional installation step would prevent access to an attacker.
          </p>
          <p>
            <ul className={classes.List}>
              <h3>OUTLINE</h3>
              <li>1. Before we get started</li>
              <li>2. How Capacitor/Cordova Break out of the Webview Sandbox</li>
              <li>3. How the Attack Works</li>
              <li>4. Mitigating Against the Attack</li>
            </ul>
          </p>
          <p>
            <h3>Before we get started</h3>
            <p>
              This article is going to continue on from my previous article on
              XSS vulnerability: Protecting Against XSS (Cross Site Scripting)
              Exploits in Ionic. If you do not understand what an XSS attack is
              or how it works, it would be a good idea to read that article
              first.
            </p>
            <p>
              When we get to the demonstration of the attack we will be taking
              the same XSS attack example we demonstrated in the Angular
              application in the previous article, and modifying that to instead
              grab the user's location periodically through the Geolocation API.
            </p>
            <p>
              The ability to create this bridge is what allows a hybrid
              application to break out of its sandbox. You don't need to add
              this bridge yourself, this is done by default when you install
              Capacitor/Cordova. However, just to get a sense of what is going
              on here let's take a brief look at how the bridge is implemented.
            </p>
            <p>
              On Android, this is achieved through calling the
              addJavascriptInterface method on the web view:
            </p>
          </p>
        </div>
        <div className={classes.Comment}>
          <div className={classes.CommentHead}>
            <div className={classes.HeadLeft}>
              <span className={classes.Cap}>Comments</span>
              <span className={classes.Num}>(10)</span>
            </div>
            <div className={classes.HeadRight}>
              <Link to="">View All</Link>
            </div>
          </div>
          <div className={classes.Comments}>
            <div className={classes.CommentsLeft}>
              <div className={classes.Commenter}>
                <img src={user} alt="comment" />
                <div className={classes.CommenterRight}>
                  <div className={classes.CommentName}>Ani Duncan</div>
                  <div className={classes.Time}>5 hrs ago</div>
                </div>
              </div>
              <i className={classes.comment}>
                Thank you very much for this resources it’s really helpful
              </i>
            </div>
            <button className={classes.Reply}>Reply</button>
          </div>
          <div className={classes.Comments} style={{ border: "0" }}>
            <div className={classes.CommentsLeft}>
              <div className={classes.Commenter}>
                <img src={user} alt="comment" />
                <div className={classes.CommenterRight}>
                  <div className={classes.CommentName}>Ani Duncan</div>
                  <div className={classes.Time}>5 hrs ago</div>
                </div>
              </div>
              <i className={classes.comment}>
                Thank you very much for this resources it’s really helpful
              </i>
            </div>
            <button className={classes.Reply}>Reply</button>
          </div>
          <div className={classes.AddPost}>
            <textarea
              className={classes.TextArea}
              placeholder="Say something..."
            ></textarea>
            <div className={classes.AddButton}>
              <button className={classes.Add}>
                <span>COMMENT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
