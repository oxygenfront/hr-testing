export function downloadFile(blob: Blob, fileName: string) {
	const fileUrl = URL.createObjectURL(blob)

	const fakeAnchor = document.createElement('a')
	fakeAnchor.href = fileUrl
	fakeAnchor.target = '_blanc'
	fakeAnchor.download = fileName.trim()
	fakeAnchor.click()
	URL.revokeObjectURL(fileUrl)
	fakeAnchor.remove()
}
