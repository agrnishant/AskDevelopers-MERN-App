import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { addPost } from "../../redux/post/post.actions";

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      errors: {},
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { user } = this.props.auth;

    const postData = {
      name: user.name,
      avatar: user.avatar,
      text: this.state.text,
    };

    this.props.addPost(postData);

    this.setState({ text: "" });

    // console.log(postData.text);
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="post-form my-3">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <CKEditor
                className="ck-editor__editable"
                editor={ClassicEditor}
                data={this.state.text}
                config={{
                  toolbar: [
                    "bold",
                    "italic",
                    "blockQuote",
                    "link",
                    "numberedList",
                    "bulletedList",
                    // "mediaEmbed",
                  ],
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({ text: data });
                }}
              />

              {errors && (
                <small className="text-danger py-2">{errors.text}</small>
              )}
            </div>

            <button type="submit" className="btn btn-dark my-2">
              Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

CreatePost.propTypes = {
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (postData) => dispatch(addPost(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
