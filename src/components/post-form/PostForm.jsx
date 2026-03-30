import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import { Button, Input, RTE, Select } from ".."
import appwriteService from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    try {
      if (!userData) { alert("You must be logged in to submit a post."); return }
      if (!data.image || !data.image[0]) { alert("Please select a featured image."); return }

      const file = await appwriteService.uploadFile(data.image[0])
      const dbPost = await appwriteService.createPost({
        ...data,
        featuredImage: file.$id,
        userId: userData.$id,
      })
      if (dbPost) navigate(`/post/${dbPost.$id}`)
      else alert("Failed to create post.")
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Check console for details.")
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
    return ""
  }, [])

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") setValue("slug", slugTransform(value.title), { shouldValidate: true })
    })
    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 flex flex-col gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Post Details</h2>
          <div className="flex flex-col gap-4">
            <Input
              label="Title"
              placeholder="Enter an engaging post title…"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="auto-generated-slug"
              hint="Auto-generated from title. You can edit it."
              {...register("slug", { required: true })}
              onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Content</h2>
          <RTE label="" name="content" control={control} defaultValue={getValues("content")} />
        </div>
      </div>

      <div className="w-full lg:w-68 flex flex-col gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Publish</h2>
          <div className="flex flex-col gap-3">
            <Select
              options={["active", "inactive"]}
              label="Status"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              className="w-full py-2.5"
              variant={post ? 'success' : 'primary'}
            >
              {post ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Post
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Publish Post
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Featured Image</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col items-center justify-center w-full h-28 rounded-lg border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-slate-300 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-slate-400">Click to upload image</span>
              <span className="text-xs text-slate-300 mt-0.5">PNG, JPG, JPEG, GIF</span>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
              />
            </label>
            {post && (
              <div className="rounded-lg overflow-hidden border border-slate-200">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-32 object-cover"
                />
                <p className="text-xs text-slate-400 text-center py-1.5">Current image</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}