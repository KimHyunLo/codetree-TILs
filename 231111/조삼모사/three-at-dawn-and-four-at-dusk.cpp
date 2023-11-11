#include <iostream>
#include <algorithm>
#include <climits>
#include <cmath>

#define MAX_N 20

using namespace std;

// 전역 변수 선언:
int n;
int p[MAX_N][MAX_N];
bool evening[MAX_N];

int ans = INT_MAX;

// 아침과 저녁 간의 힘듦의 차이를 계산합니다.
int Calc() {
    int morning_sum = 0, evening_sum = 0;
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++) {
            if(!evening[i] && !evening[j])
                morning_sum += p[i][j];
            if(evening[i] && evening[j])
                evening_sum += p[i][j];
        }
        
    return abs(morning_sum - evening_sum);
}

void FindMin(int curr_idx, int cnt) {
    // 정확히 아침 / 저녁으로 n / 2개씩 일이 나뉜 경우에만
    if(cnt == n / 2) {
        // 선택된 조합에 대해 합의 차이를 계산하여
        // 그 중 최솟값을 찾습니다.
        ans = min(ans, Calc());
		return;
    }

    // n개에 대해 전부 결정했음에도
    // n / 2 개로 나뉘지 못한 경우라면
    // 바로 퇴각합니다.
    if(curr_idx == n)
        return;

    // curr_idx 번째 업무를 아침에 하는 경우
    FindMin(curr_idx + 1, cnt);
    
    // curr_idx 번째 업무를 저녁에 하는 경우
    evening[curr_idx] = true;
    FindMin(curr_idx + 1, cnt + 1);
    evening[curr_idx] = false;
}

int main() {
    // 입력:
    cin >> n;
    for(int i = 0; i < n; i++) 
        for(int j = 0; j < n; j++)
            cin >> p[i][j];

    FindMin(0, 0);
    
    // 출력:
    cout << ans;

    return 0;
}