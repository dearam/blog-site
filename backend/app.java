import java.util.*;
 
public class MinimizeMaxDiff {
 
    public static void main(String[] args) {
Scanner scanner = new Scanner(System.in);
        int T = scanner.nextInt();
        
        while (T-- > 0) {
            int N = scanner.nextInt();
            int[] arr = new int[N];
            
            for (int i = 0; i < N; i++) {
                arr[i] = scanner.nextInt();
            }
            
            System.out.println(findMinMaxDiff(arr));
        }
        
        scanner.close();
    }
    
    private static int findMinMaxDiff(int[] arr) {
        List<int[]> ranges = new ArrayList<>();
        
        // Transform and find the range for each element
        for (int num : arr) {
            int minVal = num;
            int maxVal = num;
            
            // For even numbers, divide by 2 until it becomes odd
            while (minVal % 2 == 0) {
                minVal /= 2;
            }
            
            // For odd numbers, multiply by 2 (set an arbitrary large enough limit to avoid overflow)
            while (maxVal % 2 == 1 && maxVal < 1_000_000_000) {
                maxVal *= 2;
            }
            
            ranges.add(new int[]{minVal, maxVal});
        }
        
        // Collect all possible values
        Set<Integer> possibleValuesSet = new HashSet<>();
        for (int[] range : ranges) {
            possibleValuesSet.add(range[0]);
            if (range[1] < 1_000_000_000) {
                possibleValuesSet.add(range[1]);
            }
        }
        
        List<Integer> possibleValues = new ArrayList<>(possibleValuesSet);
        Collections.sort(possibleValues);
        
        // Find the minimum possible maximum absolute difference
        int minDiff = Integer.MAX_VALUE;
        for (int i = 0; i < possibleValues.size() - 1; i++) {
            for (int j = i + 1; j < possibleValues.size(); j++) {
                int minVal = possibleValues.get(i);
                int maxVal = possibleValues.get(j);
                
                boolean valid = true;
                for (int[] range : ranges) {
                    if (range[0] < minVal && range[1] > maxVal) {
                        valid = false;
                        break;
                    }
                }
                
                if (valid) {
                    minDiff = Math.min(minDiff, maxVal - minVal);
                    break;
                }
            }
        }
        
        return minDiff;
    }
}