package helper

func RemoveDuplicateInt64(slides []string) []string {
	result := make([]string, 0, len(slides))
	temp := map[string]struct{}{}
	for _, item := range slides {
		if _, ok := temp[item]; !ok {
			temp[item] = struct{}{}
			result = append(result, item)
		}
	}
	return result
}
